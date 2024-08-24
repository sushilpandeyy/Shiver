from pydantic import BaseModel, EmailStr, constr
from typing import Optional
from datetime import datetime

class User(BaseModel):
    username: str
    name: str
    email: EmailStr
    hashed_password: str
    is_active: bool = True
    email_verified: bool = False
    account_created: Optional[datetime]
    modified_date: Optional[datetime]

    class Config:
        orm_mode = True