from app.db import get_database
from app.models import Content, Question, Scenario, ContentWithItems
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from typing import List
from datetime import datetime
import bcrypt

# Direct use of bcrypt instead of passlib for better compatibility with Python 3.12

def user_helper(user_doc):
    return {
        "id": str(user_doc["_id"]),
        "email": user_doc["email"],
        "username": user_doc.get("username"),
        "ageGroup": user_doc.get("ageGroup", "adult"),  # Default to adult if not specified
        "created_at": user_doc.get("created_at"),
        "hashed_password": user_doc.get("hashed_password"),
        "totalXP": user_doc.get("xp", 0),
        "currentLevel": user_doc.get("level", 1),
        "last_active_date": user_doc.get("last_active_date")
    }

async def get_user_by_email(email: str):
    db = await get_database()
    doc = await db.users.find_one({"email": email})
    return user_helper(doc) if doc else None

async def create_user(user):
    db = await get_database()
    
    # Bcrypt has a 72 byte password limit, so we need to truncate longer passwords
    password = user.password
    if len(password.encode('utf-8')) > 72:
        password = password[:72]  # Truncate to 72 bytes (approximation)
    
    # Generate a salt and hash the password
    password_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password_bytes, salt).decode('utf-8')
    
    user_dict = {
        "email": user.email,
        "username": user.username,
        "hashed_password": hashed,
        "ageGroup": user.ageGroup,
        "created_at": datetime.utcnow(),
        "xp": 0,
        "level": 1,
        "last_active_date": datetime.utcnow()
    }
    result = await db.users.insert_one(user_dict)
    created = await db.users.find_one({"_id": result.inserted_id})
    return user_helper(created)

async def create_content(content: Content) -> str:
    db = await get_database()
    result = await db.content.insert_one(content.dict(exclude_unset=True))
    return str(result.inserted_id)

async def get_content_by_topic(topic: str) -> Content:
    db = await get_database()
    content_doc = await db.content.find_one({"topic": topic})
    if content_doc:
        content_doc["id"] = str(content_doc["_id"])
        del content_doc["_id"]
        return Content(**content_doc)
    return None

async def get_questions_by_content_id(content_id: str) -> List[Question]:
    db = await get_database()
    questions = []
    async for question_doc in db.questions.find({"content_id": content_id}):
        question_doc["id"] = str(question_doc["_id"])
        del question_doc["_id"]
        questions.append(Question(**question_doc))
    return questions

async def get_scenarios_by_content_id(content_id: str) -> List[Scenario]:
    db = await get_database()
    scenarios = []
    async for scenario_doc in db.scenarios.find({"content_id": content_id}):
        scenario_doc["id"] = str(scenario_doc["_id"])
        del scenario_doc["_id"]
        scenarios.append(Scenario(**scenario_doc))
    return scenarios

async def create_question(question: Question) -> str:
    db = await get_database()
    result = await db.questions.insert_one(question.dict(exclude_unset=True))
    return str(result.inserted_id)

async def create_scenario(scenario: Scenario) -> str:
    db = await get_database()
    result = await db.scenarios.insert_one(scenario.dict(exclude_unset=True))
    return str(result.inserted_id)

async def get_content_with_items(topic: str) -> ContentWithItems:
    content = await get_content_by_topic(topic)
    if not content:
        return None
    questions = await get_questions_by_content_id(content.id)
    scenarios = await get_scenarios_by_content_id(content.id)
    return ContentWithItems(content=content, questions=questions, scenarios=scenarios)