from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from utils.jwt import decode_access_token
from models.user import User
from schemas.token import TokenData

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

fake_users_db = {
    "user@example.com": {
        "username": "user@example.com",
        "email": "user@example.com",
        "full_name": "John Doe",
        "hashed_password": "$2b$12$KIXTOhw8ZG9E8FX1DUG5Bu2/JIVOB4SeVhYB6P9Nmi7ai/KOv.3WG",  # "password"
        "disabled": False,
    }
}

def get_user(db, username: str):
    user = db.get(username)
    if user:
        return User(**user)

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    payload = decode_access_token(token)
    if payload is None:
        raise credentials_exception
    username: str = payload.get("sub")
    if username is None:
        raise credentials_exception
    token_data = TokenData(username=username)
    user = get_user(fake_users_db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user
