# main.py
from fastapi import FastAPI, Request
from app.models.user import User as User_model
from app.db.base import engine
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import os

app = FastAPI()

templates = Jinja2Templates(directory=os.path.abspath("/Users/sushilpandey/Documents/Mine/Shiver/server/app/templates"))
app.mount("/static", StaticFiles(directory=os.path.abspath("/Users/sushilpandey/Documents/Mine/Shiver/server/app/static")), name="static")

@app.get("/", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse(
        request=request, name="home.html"
    )

@app.get("/dashboard", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse(
        request=request, name="Dashboard.html"
    )

@app.get("/chat", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse(
        request=request, name="Chat.html"
    )

@app.get("/recipie", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse(
        request=request, name="Recipie.html"
    )

# Ensure all tables are created
User_model.metadata.create_all(bind=engine)

# Include your routers here (if any)
# app.include_router(your_router)