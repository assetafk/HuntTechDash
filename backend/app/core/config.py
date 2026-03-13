import os
from dotenv import load_dotenv
import dataclasses
from dataclasses import dataclass

load_dotenv()

@dataclass(frozen=True)
class Settings:
    database_url: str
    jwt_secret: str
    jwt_algorithm: str
    access_token_expire_minutes: int


def load_settings() -> Settings:
    database_url = os.getenv("DATABASE_URL")

    if not database_url:
        raise ValueError("DATABASE_URL is not set")
    
    return Settings(
        database_url=database_url,
        jwt_secret=os.getenv("JWT_SECRET", "change_me"),
        jwt_algorithm="HS256",
        access_token_expire_minutes=60                      
    )

settings = load_settings()
