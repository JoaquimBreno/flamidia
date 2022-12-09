from fastapi import APIRouter, HTTPException, Path
from fastapi import Depends
from config import SessionLocal
from sqlalchemy.orm import Session
from schema import LanchoneteSchema, Response, RequestLanchonete

import crud

router = APIRouter(
    prefix="/lanchonete",
    tags=["lanchonete"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
async def get_lanchonete(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    _lanchonete = crud.get_lanchonete(db, skip, limit)
    return Response(status="Ok", code="200", message="Success fetch all data", result=_lanchonete)
