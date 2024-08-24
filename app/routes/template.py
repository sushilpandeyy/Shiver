from fastapi import FastAPI, Request, APIRouter, HTTPException, Depends
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
import os

templates = Jinja2Templates(directory=os.path.abspath("/Users/sushilpandey/Documents/Mine/Shiver/app/templates"))

router = APIRouter()


@router.get("/", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse(
        request=request, name="home.html"
    )

@router.get("/dashboard", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse(
        request=request, name="Dashboard.html"
    )

@router.get("/chat", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse(
        request=request, name="Chat.html"
    )
    
@router.get("/nitya", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse(
        "Recipie.html",
        {"request": request}
    )

@router.get("/herbert", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse(
        request=request, name="Herb.html"
    )

@router.get("/coldemail", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse(
        request=request, name="Cold.html"
    )