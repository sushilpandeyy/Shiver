from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = MongoClient('mongodb+srv://sushilpandey:yXtZBBc2ZCDqbBT@shiver1.sar29rn.mongodb.net/?retryWrites=true&w=majority&appName=Shiver1')

@app.get("/")
def welcome():

    return {"message": "Welcome to SERVER...."}

