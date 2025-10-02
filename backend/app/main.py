from fastapi import FastAPI, BackgroundTasks, HTTPException, Depends, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from app.db import connect_to_mongo, close_mongo_connection
from app.models import Content, ContentWithItems, UserCreate, Token, UserPublic
from app.crud import create_content, get_content_with_items, get_user_by_email, create_user
from app.auth import authenticate_user, create_access_token, get_current_user
from app.generate import generate_questions_from_content, generate_scenarios_from_content
from app.config import settings
from fastapi.security import OAuth2PasswordRequestForm


app = FastAPI(title="Constitution Learning Platform API")

# Configure CORS
origins = [
    "http://localhost:3000",  # React development server
    "http://localhost:3001",  # React development server alternate port
    "http://localhost:5000",  # Potential production frontend
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "http://127.0.0.1:5000",
    "*",  # Allow all origins for development - remove in production
    # Add your production domain when you deploy
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=600,  # Cache preflight requests for 10 minutes
)

# Custom middleware to handle OPTIONS requests
@app.middleware("http")
async def options_middleware(request: Request, call_next):
    if request.method == "OPTIONS":
        # Handle OPTIONS request
        response = Response()
        response.headers["Access-Control-Allow-Origin"] = "*"  # Or specific origin
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type"
        response.headers["Access-Control-Max-Age"] = "600"  # Cache the preflight request for 10 minutes
        return response
    
    # For non-OPTIONS requests, proceed as normal
    return await call_next(request)

@app.on_event("startup")
async def startup_event():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_event():
    await close_mongo_connection()

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Constitution Learning Platform API"}

@app.get("/test-cors")
async def test_cors():
    return {"message": "CORS is working properly"}
    
@app.options("/register")
async def register_options():
    # This route explicitly handles OPTIONS requests to /register
    return {}

@app.post("/register", response_model=UserPublic)
async def register(user: UserCreate):
    try:
        existing = await get_user_by_email(user.email)
        if existing:
            raise HTTPException(status_code=400, detail="Email already registered")
        created = await create_user(user)
        return UserPublic(**created)
    except Exception as e:
        raise

@app.options("/token")
async def token_options():
    # This route explicitly handles OPTIONS requests to /token
    return {}

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    # OAuth2PasswordRequestForm uses 'username' field — we use email
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    access_token = create_access_token({"sub": user["email"]})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me", response_model=UserPublic)
async def read_users_me(current_user = Depends(get_current_user)):
    return UserPublic(**current_user)

@app.post("/content", response_model=str)
async def add_content(content: Content, background_tasks: BackgroundTasks):
    """
    Add new content to the database.
    Triggers background task to generate questions and scenarios.
    """
    content_id = await create_content(content)
    content.id = content_id
    # Add background task for generation
    background_tasks.add_task(generate_and_save_items, content)
    return content_id

async def generate_and_save_items(content: Content):
    """
    Background task to generate and save questions and scenarios.
    """
    from app.crud import create_question, create_scenario
    questions = await generate_questions_from_content(content)
    scenarios = await generate_scenarios_from_content(content)
    
    for question in questions:
        await create_question(question)
    
    for scenario in scenarios:
        await create_scenario(scenario)

@app.get("/content/{topic}", response_model=ContentWithItems)
async def get_content(topic: str):
    """
    Get content along with its questions and scenarios for a topic.
    """
    result = await get_content_with_items(topic)
    if not result:
        raise HTTPException(status_code=404, detail="Content not found")
    return result

@app.get("/quizzes/{topic}", response_model=ContentWithItems)
async def get_quizzes(topic: str):
    """
    Get quizzes (questions and scenarios) for a topic.
    """
    return await get_content(topic)