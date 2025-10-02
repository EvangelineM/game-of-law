from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional
from dotenv import load_dotenv
import os

# Load .env file manually
load_dotenv()

# Hard-coded fallback for MongoDB URL in case environment variable doesn't work
MONGODB_FALLBACK = "mongodb+srv://evangelinemariadurai_db_user:evangeline123@cluster0.emwcxuy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

class Settings(BaseSettings):
    # Get MongoDB URL from environment or use a fallback
    mongodb_url: str = os.getenv("MONGODB_URL", MONGODB_FALLBACK)
    database_name: str = os.getenv("DATABASE_NAME", "constitution_db")
    ai_api_key: Optional[str] = os.getenv("AI_API_KEY")
    mongodb_db: str = os.getenv("MONGODB_DB", "game_of_law")
    jwt_secret: str = os.getenv("JWT_SECRET", "Evangelineketu123")  # Default for development only
    access_token_expire_minutes: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))
    jwt_algorithm: str = "HS256"
    
    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False
    )

settings = Settings()