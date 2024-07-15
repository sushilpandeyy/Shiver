from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pymongo import MongoClient, errors
from pydantic import BaseModel
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from api.endpoints.auth import auth_router

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
        # Attempt to get the server info to trigger the connection
        client.server_info()
        print("Connected to MongoDB")
    except errors.ConnectionFailure:
        print("Failed to connect to MongoDB")

app.include_router(auth_router, prefix="/auth", tags=["auth"])

@app.get("/")
def welcome():
    check_mongodb_connection(client)
    return {"message": "Welcome to SERVER...."}