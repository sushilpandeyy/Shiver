from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from app.schemas.user import User as UserModel
from app.schemas.user import UserLogin
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

@authrouter.post('/login', response_model=UserLogin, status_code=status.HTTP_200_OK)
async def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = crud_user.get_user_by_username(db, username=user.username)
    if db_user:
        db_user = crud_user.get_user_by_email(db, email=user.email)
        if db_user:
            new_user = crud_user.authenticate_user(db, email=user.email, password=user.hashed_password)
            if new_user:
                return new_user
            else:
                raise HTTPException(status_code=400, detail="Wrong Password | Something went wrong")
        else:
            raise HTTPException(status_code=400, detail="Email Does not exsist")
    else:
        raise HTTPException(status_code=400, detail="Username Does not exsist")


