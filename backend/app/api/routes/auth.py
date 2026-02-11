from fastapi import APIRouter, Depends, HTTPException, status 
from sqlalchemy.orm import Session
from app.api.schemas.user import User

from app.core.db import get_db_session
from app.api.schemas.user import RegisterRequest, LoginRequest, TokenResponse, UserResponse

from app.api.services import AuthService


router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)

@router.post("/register", response_model=TokenResponse)


def register(
    payload: RegisterRequest,
    session: Session = Depends(get_db_session),
) -> TokenResponse:
    
    service = AuthService(session)

    try:
        token = service.register(
            email=payload.email,
            name=payload.name,
            password=payload.password,
        )
        return TokenResponse(access_token=token)
    
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )

@router.post("/login", response_model=TokenResponse)

def login(
    payload: LoginRequest,
    session: Session = Depends(get_db_session),
) -> TokenResponse:
    
    service = AuthService(session)

    try:
        token = service.login(
            email=payload.email,
            password=payload.password,
        )
        return TokenResponse(access_token=token)
    
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )


@router.get("/me", response_model=UserResponse)

def get_me(current_user: User = Depends(get_current_user)) -> UserResponse:
    return UserResponse.model_validate(current_user)