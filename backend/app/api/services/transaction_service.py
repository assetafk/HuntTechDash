from typing import Iterable

from sqlalchemy.orm import Session

from app.api.models.transaction import Transaction
from app.api.models.user import User
from app.api.schemas.transaction import (
    TransactionCreate,
    TransactionListResponse,
    TransactionRead,
)


class TransactionService:
    def __init__(self, session: Session) -> None:
        self._session = session

    def create_transaction(self, user: User, data: TransactionCreate) -> TransactionRead:
        tx = Transaction(
            user_id=user.id,
            amount=data.amount,
            currency=data.currency,
            type=data.type,
            status=data.status,
            category=data.category,
            description=data.description,
        )
        self._session.add(tx)
        self._session.commit()
        self._session.refresh(tx)
        return TransactionRead.model_validate(tx)

    def list_transactions(
        self,
        user: User,
        limit: int = 20,
        offset: int = 0,
    ) -> TransactionListResponse:
        query = (
            self._session.query(Transaction)
            .filter(Transaction.user_id == user.id)
            .order_by(Transaction.created_at.desc())
        )
        total = query.count()
        items: Iterable[Transaction] = query.limit(limit).offset(offset).all()
        return TransactionListResponse(
            total=total,
            items=[TransactionRead.model_validate(tx) for tx in items],
        )

    def get_transaction(self, user: User, tx_id: int) -> TransactionRead:
        tx: Transaction | None = (
            self._session.query(Transaction)
            .filter(
                Transaction.id == tx_id,
                Transaction.user_id == user.id,
            )
            .first()
        )
        if tx is None:
            raise ValueError("Transaction not found")
        return TransactionRead.model_validate(tx)

