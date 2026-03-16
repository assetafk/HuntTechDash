from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.schemas.transaction import (
    TransactionCreate,
    TransactionListResponse,
    TransactionRead,
)
from app.api.schemas.user import User
from app.api.services.transaction_service import TransactionService
from app.core.db import get_db_session
from app.core.security import get_current_user


router = APIRouter(
    prefix="/transactions",
    tags=["transactions"],
)


@router.post(
    "",
    response_model=TransactionRead,
    status_code=status.HTTP_201_CREATED,
)
def create_transaction(
    payload: TransactionCreate,
    session: Session = Depends(get_db_session),
    current_user: User = Depends(get_current_user),
) -> TransactionRead:
    service = TransactionService(session)
    try:
        return service.create_transaction(current_user, payload)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )


@router.get("", response_model=TransactionListResponse)
def list_transactions(
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    session: Session = Depends(get_db_session),
    current_user: User = Depends(get_current_user),
) -> TransactionListResponse:
    service = TransactionService(session)
    return service.list_transactions(
        user=current_user,
        limit=limit,
        offset=offset,
    )


@router.get("/{transaction_id}", response_model=TransactionRead)
def get_transaction(
    transaction_id: int,
    session: Session = Depends(get_db_session),
    current_user: User = Depends(get_current_user),
) -> TransactionRead:
    service = TransactionService(session)
    try:
        return service.get_transaction(current_user, transaction_id)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )
