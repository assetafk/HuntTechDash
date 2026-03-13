from fastapi import FastAPI

from app.db import engine, Base
from app.api.routes.auth_routes import router as auth_router


def create_application() -> FastApi:
    application = FastAPI(title="HuntTechDash API")
    application.include_router(auth_router)
    return application

app = create_application()


Base.metadata.create_all(bind=engine)