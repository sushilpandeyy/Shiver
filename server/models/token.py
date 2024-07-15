from datetime import datetime, timedelta
from jose import JWTError, jwt
from pydantic import BaseModel

# Replace with your secret key and algorithm
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"


class TokenData(BaseModel):
    username: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


def create_access_token(data: dict, expires_delta=timedelta(minutes=15)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"expire": expire.timestamp()})
    encoded_token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return Token(access_token=encoded_token)


def verify_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload["username"]
    except JWTError:
        return None
