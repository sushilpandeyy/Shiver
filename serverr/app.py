from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pymongo import MongoClient, errors
from pydantic import BaseModel
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext

from api.endpoints.auth import auth_router
from api.endpoints.login import login
from api.endpoints.signup import signup

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = MongoClient('mongodb+srv://sushilpandey:yXtZBBc2ZCDqbBT@shiver1.sar29rn.mongodb.net/?retryWrites=true&w=majority&appName=Shiver1')


def check_mongodb_connection(client):
    try:
        client.server_info()
        print("Connected to MongoDB")
    except errors.ConnectionFailure:
        print("Failed to connect to MongoDB")

app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(login.router)
app.include_router(signup.router)

@app.get("/")
def welcome():
    check_mongodb_connection(client)
    return {"message": "Welcome to SERVER...."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)