from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Literal, Dict, Any
from datetime import datetime

class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str
    ageGroup: Literal["child", "teen", "adult"]

class UserInDB(BaseModel):
    id: Optional[str] = None
    email: EmailStr
    username: str
    hashed_password: str
    ageGroup: Literal["child", "teen", "adult"]
    created_at: datetime
    xp: int = 0
    level: int = 1
    last_active_date: Optional[datetime] = None

class UserPublic(BaseModel):
    id: Optional[str] = None
    email: EmailStr
    username: str
    ageGroup: Literal["child", "teen", "adult"]
    created_at: datetime
    totalXP: int = 0
    currentLevel: int = 1

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class Content(BaseModel):
    id: Optional[str] = None
    topic: str
    text: str
    source_url: Optional[str] = None
    created_at: datetime = datetime.utcnow()

class Question(BaseModel):
    id: Optional[str] = None
    content_id: str
    question: str
    options: List[str]
    correct_answer: int  # index of correct option
    explanation: Optional[str] = None

class Scenario(BaseModel):
    id: Optional[str] = None
    content_id: str
    situation: str
    question: str
    options: List[str]
    correct_answer: int
    explanation: Optional[str] = None

class ContentWithItems(BaseModel):
    content: Content
    questions: List[Question]
    scenarios: List[Scenario]

class UserActivityItem(BaseModel):
    action: str
    details: Dict[str, Any] = {}
    reward: int
    timestamp: datetime = datetime.utcnow()
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    login_method: Optional[str] = None
    game_name: Optional[str] = None
    session_id: Optional[str] = None

class UserActivity(BaseModel):
    id: Optional[str] = None
    user_id: str
    activities: List[UserActivityItem] = []
    total_xp_earned: int = 0
    last_activity_date: Optional[datetime] = None

class LogActivityRequest(BaseModel):
    action: str
    details: Dict[str, Any] = {}
    # Optional game name to record which game was played (e.g. "spin the wheel")
    game_name: Optional[str] = None
    # Optional login details
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    login_method: Optional[str] = None
    session_id: Optional[str] = None

class UserStats(BaseModel):
    total_xp: int
    level: int
    recent_activities: List[Dict[str, Any]]
    streak_count: int
    suggested_difficulty: str