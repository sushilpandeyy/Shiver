# main.py
from fastapi import FastAPI, Request
from app.models.user import User as User_model
from app.db.base import engine
from fastapi.staticfiles import StaticFiles
import os
from app.routes.template import router
from app.api.endpoints.user import authrouter

app = FastAPI()

User_model.metadata.create_all(bind=engine)

app.include_router(authrouter, prefix="/auth", tags=["auth"])

app.mount("/static", StaticFiles(directory=os.path.abspath("/Users/sushilpandey/Documents/Mine/Shiver/app/static")), name="static")

app.include_router(router, tags=["Templates"])

