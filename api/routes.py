from fastapi import APIRouter, HTTPException, Path
from fastapi import Depends
from config import SessionLocal
from sqlalchemy.orm import Session
from schema import ClienteSchema, Response, RequestCliente

import crud

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
async def get_cliente(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    _cliente = crud.get_cliente(db, skip, limit)
    return Response(status="Ok", code="200", message="Success fetch all data", result=_cliente)
