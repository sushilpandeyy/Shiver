from fastapi import APIRouter, HTTPException, Depends
from models.user import User


router = APIRouter()

@router.post("/login/")
async def login(user: User):
    user_data = user.dict()
    stored_user = await users_collection.find_one({"email": user_data["email"]})
    
    if not stored_user or stored_user["password"] != user_data["password"]:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Implement JWT token generation here (example)
    # Return token or any other authentication response
    return {"message": "Login successful"}
