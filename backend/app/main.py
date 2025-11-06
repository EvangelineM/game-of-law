from fastapi import FastAPI, BackgroundTasks, HTTPException, Depends, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from app.db import connect_to_mongo, close_mongo_connection, get_database
from app.models import Content, ContentWithItems, UserCreate, Token, UserPublic, LogActivityRequest, UserActivity, UserActivityItem
from app.crud import create_content, get_content_with_items, get_user_by_email, create_user
from app.auth import authenticate_user, create_access_token, get_current_user
from app.generate import generate_questions_from_content, generate_scenarios_from_content
from app.config import settings
from fastapi.security import OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.db import get_database
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId


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
async def login_for_access_token(
    request: Request,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    # OAuth2PasswordRequestForm uses 'username' field — we use email
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    access_token = create_access_token({"sub": user["email"]})
    
    # Log login activity
    client_ip = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")
    
    activity_item = UserActivityItem(
        action="user_login",
        details={"email": user["email"], "login_time": datetime.utcnow().isoformat()},
        reward=0,  # Login doesn't give XP reward
        ip_address=client_ip,
        user_agent=user_agent,
        login_method="password"
    )
    
    # Find or create user activity document
    user_activity_doc = await db.user_activity.find_one({"user_id": user["id"]})
    
    if user_activity_doc:
        # Update existing document: append activity
        await db.user_activity.update_one(
            {"user_id": user["id"]},
            {
                "$push": {"activities": activity_item.dict()},
                "$set": {"last_activity_date": datetime.utcnow()}
            }
        )
    else:
        # Create new document for user
        user_activity = UserActivity(
            user_id=user["id"],
            activities=[activity_item],
            total_xp_earned=0,
            last_activity_date=datetime.utcnow()
        )
        await db.user_activity.insert_one(user_activity.dict())
    
    # Update user's last login date
    await db.users.update_one(
        {"_id": ObjectId(user["id"])}, 
        {"$set": {"last_active_date": datetime.utcnow()}}
    )
    
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

@app.post("/log-activity")
async def log_activity(
    request: LogActivityRequest, 
    current_user = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Logs a user action, assigns a reward, and updates XP.
    This is the core of the reinforcement learning reward system.
    """
    try:
        from app.rewards import REWARD_RULES

        # Validate action exists in REWARD_RULES
        if request.action not in REWARD_RULES:
            raise HTTPException(status_code=400, detail="Invalid action")

        reward = REWARD_RULES[request.action]

        # Create activity item
        activity_item = UserActivityItem(
            action=request.action,
            details=request.details,
            reward=reward,
            ip_address=request.ip_address,
            user_agent=request.user_agent,
            login_method=request.login_method,
            game_name=(request.game_name or (request.details or {}).get("game_name")),
            session_id=request.session_id
        )

        # Find or create user activity document
        user_activity_doc = await db.user_activity.find_one({"user_id": current_user["id"]})
        
        if user_activity_doc:
            # Update existing document: append activity and update totals
            await db.user_activity.update_one(
                {"user_id": current_user["id"]},
                {
                    "$push": {"activities": activity_item.dict()},
                    "$inc": {"total_xp_earned": reward},
                    "$set": {"last_activity_date": datetime.utcnow()}
                }
            )
        else:
            # Create new document for user
            user_activity = UserActivity(
                user_id=current_user["id"],
                activities=[activity_item],
                total_xp_earned=reward,
                last_activity_date=datetime.utcnow()
            )
            await db.user_activity.insert_one(user_activity.dict())

        # Update user's XP and last_active_date
        user_update = {
            "$inc": {"xp": reward},
            "$set": {"last_active_date": datetime.utcnow()}
        }
        user_id_obj = ObjectId(current_user["id"])
        await db.users.update_one({"_id": user_id_obj}, user_update)

        # Fetch updated user data
        updated_user = await db.users.find_one({"_id": user_id_obj})
        
        # Recalculate level (simple formula: level = floor(XP/100) + 1)
        new_level = (updated_user["xp"] // 100) + 1
        await db.users.update_one({"_id": user_id_obj}, {"$set": {"level": new_level}})

        return {"message": "Activity logged", "reward": reward, "new_xp": updated_user["xp"]}
    except Exception as e:
        # Log the error and return it for debugging
        import traceback
        error_details = traceback.format_exc()
        print(f"Error in log_activity: {e}")
        print(f"Traceback: {error_details}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/user-stats")
async def get_user_stats(current_user = Depends(get_current_user), db: AsyncIOMotorDatabase = Depends(get_database)):
    """
    Returns user stats including XP, activities, streak, and personalized learning suggestions.
    """
    from app.rewards import REWARD_RULES

    # Get user data
    user = await db.users.find_one({"_id": ObjectId(current_user["id"])})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Get user activity document
    user_activity_doc = await db.user_activity.find_one({"user_id": current_user["id"]})
    recent_activities = []
    
    if user_activity_doc and "activities" in user_activity_doc:
        # Sort activities by timestamp (most recent first) and take last 20
        sorted_activities = sorted(user_activity_doc["activities"], key=lambda x: x.get("timestamp", datetime.min), reverse=True)
        recent_activities = sorted_activities[:20]

    # Calculate streak (consecutive days with activity)
    streak_count = 0
    current_date = datetime.utcnow().date()
    check_date = current_date

    while True:
        # Check if user had activity on this date
        start_of_day = datetime.combine(check_date, datetime.min.time())
        end_of_day = datetime.combine(check_date, datetime.max.time())
        
        # Check if any activities fall within this date range
        has_activity = False
        if user_activity_doc and "activities" in user_activity_doc:
            for activity in user_activity_doc["activities"]:
                activity_time = activity.get("timestamp")
                if activity_time and isinstance(activity_time, datetime):
                    if start_of_day <= activity_time <= end_of_day:
                        has_activity = True
                        break
        
        if has_activity:
            streak_count += 1
            check_date -= timedelta(days=1)
        else:
            break

    # Analyze performance for personalized suggestions
    performance_analysis = analyze_user_performance(recent_activities)
    
    # Generate personalized recommendations
    recommendations = generate_personalized_recommendations(user, recent_activities, performance_analysis)

    return {
        "total_xp": user["xp"],
        "level": user["level"],
        "recent_activities": recent_activities,
        "streak_count": streak_count,
        "suggested_difficulty": performance_analysis["suggested_difficulty"],
        "performance_analysis": performance_analysis,
        "personalized_recommendations": recommendations
    }

def analyze_user_performance(activities):
    """
    Analyze user performance based on recent activities.
    """
    if not activities:
        return {
            "suggested_difficulty": "easy",
            "accuracy_rate": 0,
            "activity_frequency": "low",
            "strengths": [],
            "weaknesses": ["No recent activity"],
            "engagement_level": "low"
        }

    # Calculate accuracy rate
    correct_answers = sum(1 for act in activities if act.get("action") in ["quiz_correct", "spin_wheel_correct"])
    total_answers = sum(1 for act in activities if act.get("action") in ["quiz_correct", "quiz_attempted", "spin_wheel_correct", "spin_wheel_attempted"])
    
    accuracy_rate = (correct_answers / total_answers * 100) if total_answers > 0 else 0

    # Analyze activity patterns
    game_activities = sum(1 for act in activities if act.get("action") == "played_game")
    quiz_activities = sum(1 for act in activities if act.get("action") in ["quiz_correct", "quiz_attempted"])
    lesson_activities = sum(1 for act in activities if act.get("action") in ["completed_lesson", "completed_module"])
    spin_activities = sum(1 for act in activities if act.get("action") in ["spin_wheel_correct", "spin_wheel_attempted"])

    # Determine activity frequency
    recent_days = 7
    activity_frequency = "high" if len(activities) >= recent_days else "medium" if len(activities) >= recent_days//2 else "low"

    # Determine engagement level
    engagement_score = len(activities) + game_activities * 2 + lesson_activities * 3
    engagement_level = "high" if engagement_score >= 15 else "medium" if engagement_score >= 8 else "low"

    # Identify strengths and weaknesses
    strengths = []
    weaknesses = []

    if accuracy_rate >= 80:
        strengths.append("Strong quiz performance")
    elif accuracy_rate < 50:
        weaknesses.append("Needs improvement in quiz accuracy")

    if game_activities >= 3:
        strengths.append("Engaged with games")
    elif game_activities == 0:
        weaknesses.append("Hasn't tried games yet")

    if lesson_activities >= 2:
        strengths.append("Good progress in learning modules")
    elif lesson_activities == 0:
        weaknesses.append("Hasn't completed learning modules")

    if spin_activities >= 5:
        strengths.append("Frequent spin wheel usage")
    elif spin_activities == 0:
        weaknesses.append("Hasn't tried spin wheel")

    # Suggest difficulty based on performance
    if accuracy_rate >= 80 and engagement_level == "high":
        suggested_difficulty = "hard"
    elif accuracy_rate >= 60 or engagement_level == "medium":
        suggested_difficulty = "medium"
    else:
        suggested_difficulty = "easy"

    return {
        "suggested_difficulty": suggested_difficulty,
        "accuracy_rate": round(accuracy_rate, 1),
        "activity_frequency": activity_frequency,
        "engagement_level": engagement_level,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "activity_breakdown": {
            "games_played": game_activities,
            "quiz_questions": quiz_activities,
            "lessons_completed": lesson_activities,
            "spin_wheel_questions": spin_activities
        }
    }

def generate_personalized_recommendations(user, activities, performance_analysis):
    """
    Generate personalized learning recommendations based on user performance.
    """
    recommendations = []
    
    # Base recommendations on performance analysis
    if performance_analysis["accuracy_rate"] < 60:
        recommendations.append({
            "type": "improvement",
            "title": "Focus on Quiz Accuracy",
            "description": "Your quiz accuracy is below 60%. Try reviewing the learning modules before taking quizzes.",
            "action": "complete_learning_module",
            "priority": "high"
        })
    
    if performance_analysis["engagement_level"] == "low":
        recommendations.append({
            "type": "engagement",
            "title": "Increase Daily Activity",
            "description": "Try to be active every day to build a learning streak and earn bonus XP.",
            "action": "daily_login",
            "priority": "medium"
        })
    
    if not any(act.get("action") == "played_game" for act in activities[-5:]):
        recommendations.append({
            "type": "exploration",
            "title": "Try Interactive Games",
            "description": "Games are a fun way to learn! Try the card matching or situation-based games.",
            "action": "play_game",
            "priority": "medium"
        })
    
    if not any(act.get("action") in ["spin_wheel_correct", "spin_wheel_attempted"] for act in activities[-3:]):
        recommendations.append({
            "type": "exploration",
            "title": "Spin the Wheel for Quick Learning",
            "description": "The spin wheel offers quick questions and XP rewards. Give it a try!",
            "action": "try_spin_wheel",
            "priority": "low"
        })
    
    if performance_analysis["activity_frequency"] == "low":
        recommendations.append({
            "type": "motivation",
            "title": "Build Learning Habits",
            "description": "Set aside 10-15 minutes daily for learning to improve your knowledge and earn rewards.",
            "action": "increase_frequency",
            "priority": "medium"
        })
    
    # Level-based recommendations
    user_level = user.get("level", 1)
    if user_level <= 2:
        recommendations.append({
            "type": "progression",
            "title": "Start with Basic Modules",
            "description": "Begin with the fundamental learning modules to build a strong foundation.",
            "action": "start_basic_modules",
            "priority": "high"
        })
    elif user_level <= 5:
        recommendations.append({
            "type": "progression",
            "title": "Challenge Yourself",
            "description": "You're ready for more advanced content. Try medium difficulty quizzes and games.",
            "action": "try_medium_content",
            "priority": "medium"
        })
    else:
        recommendations.append({
            "type": "progression",
            "title": "Master Advanced Topics",
            "description": "Take on hard difficulty challenges and help others learn by sharing your knowledge.",
            "action": "advanced_challenges",
            "priority": "low"
        })
    
    # Sort by priority
    priority_order = {"high": 0, "medium": 1, "low": 2}
    recommendations.sort(key=lambda x: priority_order.get(x["priority"], 3))
    
    return recommendations[:5]  # Return top 5 recommendations