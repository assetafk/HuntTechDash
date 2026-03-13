from fastapi import status, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.core.security import decode_access_token, get_db_session
from app.core.db import get_db_session
from app.api.models.user import User

security = HTTPBearer()


def get_current_user(
        credentials: HTTPAuthorizationCredentials = Depends(security),
        session: Session = Depends(get_db_session),
) -> User:
    
    token = credentials.credentials

    try:
        payload = decode_access_token(token)

        user_id = payload.get("user_id")

        if not user_id:
            raise ValueError("Invalid token")
    
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )
    
    user = session.get(User, user_id)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )
    
    return user