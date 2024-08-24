from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from app.schemas.user import User as UserModel
from app.crud.user import crud_user
from app.db.base import get_db
from app.utils.security import hash_password

authrouter =  APIRouter()


@authrouter.post('/signup', response_model=UserModel, status_code=status.HTTP_201_CREATED)
async def signup(user: UserModel, db: Session = Depends(get_db)):
    db_user = crud_user.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    user.hashed_password = hash_password(user.hashed_password)
    new_user = crud_user.create_user(db=db, user=user)
    return new_user
    