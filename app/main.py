# main.py
from fastapi import FastAPI, Request
from app.models.user import User as User_model
from app.db.base import engine
from fastapi.staticfiles import StaticFiles
import os
from app.routes.template import router

app = FastAPI()

app.mount("/static", StaticFiles(directory=os.path.abspath("/Users/sushilpandey/Documents/Mine/Shiver/app/static")), name="static")

app.include_router(router)

# Ensure all tables are created
#User_model.metadata.create_all(bind=engine)

# Include your routers here (if any)
# app.include_router(your_router)