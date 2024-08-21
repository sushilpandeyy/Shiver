# main.py
from fastapi import FastAPI
from app.models.user import User as User_model
from app.db.base import engine

app = FastAPI()

# Ensure all tables are created
User_model.metadata.create_all(bind=engine)

# Include your routers here (if any)
# app.include_router(your_router)