from sqlalchemy.orm import Session

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
)

from app.api.repositories.user_repository import UserRepository


class AuthService:

    def __init__(self, session: Session):
        self._user_repository = UserRepository(session)
    
    def register(
        self,
        email: str,
        name: str,
        password: str,
    ) -> str:
        
        existing_user = self._user_repository.get_by_email(email)

        if existing_user:
            raise ValueError("Email already registered")
        
        hashed_password = hash_password(password)

        user = self._user_repository.create(
            email=email,
            name=name,
            hashed_password=hashed_password,
        )

        return create_access_token(
            {"user_id": user.id}
        )
    
    def login(
        self,
        email: str,
        password: str,
    ) -> str:
        
        user = self._user_repository.get_by_email(email)

        if not user:
            raise ValueError("Invalid credentials")
        
        if not verify_password(password, user.hashed_password):
            raise ValueError("Invalid credentials")
        
        return create_access_token(
            {"user_id": user.id}
        )