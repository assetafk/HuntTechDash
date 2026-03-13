from sqlalchemy.orm import Session

from app.models.user import User


class UserRepository:
    
    def __init__(self, session: Session):
        self.session = session
    
    def get_by_email(self, email: str) -> User | None:
        return(
        self._session.query(User)
         .filter(User.email == email)
         .first()
        )
    
    def create(
        self,
        email: str,
        name: str,
        hashed_password: str,
    ) -> User:
        user = User(
            email=email,
            name=name,
            hashed_password=hashed_password,
        )
        self._session.add(user)
        self._session.commit()
        self._session.refresh(user)
        return user