from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Literal
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

class UserPublic(BaseModel):
    id: Optional[str] = None
    email: EmailStr
    username: str
    ageGroup: Literal["child", "teen", "adult"]
    created_at: datetime

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