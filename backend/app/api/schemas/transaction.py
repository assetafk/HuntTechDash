from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field, condecimal


class TransactionBase(BaseModel):
    amount: condecimal(max_digits=10, decimal_places=2) = Field(..., gt=0)
    currency: str = Field("USD", min_length=3, max_length=3)
    type: str = Field(..., regex="^(income|expense)$")
    status: str = Field("completed", max_length=32)
    category: Optional[str] = Field(None, max_length=64)
    description: Optional[str] = Field(None, max_length=255)


class TransactionCreate(TransactionBase):
    pass


class TransactionRead(TransactionBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class TransactionListResponse(BaseModel):
    total: int
    items: List[TransactionRead]
