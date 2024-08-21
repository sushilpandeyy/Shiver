from fastapi import APIRouter, HTTPException
from models.user import User
from db.mongo import users_collection

router = APIRouter()

@router.post("/signup/")
async def signup(user: User):
    user_data = user.dict()
    existing_user = await users_collection.find_one({"email": user_data["email"]})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Hash password before storing (use bcrypt or similar)
    # For simplicity, let's assume a hashed password for now
    user_data["password"] = "hashed_password"  # Replace with actual hashing logic
    
    # Insert user into MongoDB
    result = await users_collection.insert_one(user_data)
    return {"message": "User created successfully"}
