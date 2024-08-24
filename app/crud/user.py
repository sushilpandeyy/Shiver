from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import User as UserModel
from typing import Optional, List

class CRUDUser:
    def get_user_by_username(self, db: Session, username: str) -> Optional[User]:
        return db.query(User).filter(User.username == username).first()
    
    def get_user_by_email(self, db: Session, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()

    def get_users(self, db: Session, skip: int = 0, limit: int = 10) -> List[User]:
        return db.query(User).offset(skip).limit(limit).all()
    
    def create_user(self, db: Session, user: UserModel) -> User:
        db_user = User(
            username=user.username,
            name=user.name,
            email=user.email,
            hashed_password=user.hashed_password, 
            is_active=user.is_active,
            email_verified=user.email_verified
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    
    def update_user(self, db: Session, db_user: User, user_update: UserModel) -> User:
        update_data = user_update.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_user, key, value)
        db.commit()
        db.refresh(db_user)
        return db_user

    def delete_user(self, db: Session, username: str) -> Optional[User]:
        user = self.get_user_by_username(db, username)
        if user:
            db.delete(user)
            db.commit()
        return user

crud_user = CRUDUser()