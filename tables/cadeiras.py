from fastapi import APIRouter, HTTPException, Path
from fastapi import Depends
from config import SessionLocal
from sqlalchemy.orm import Session
from schema import CadeiraSchema, Response, RequestCadeira

import crud

router = APIRouter(
    prefix="/cadeira",
    tags=["cadeira"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/id/{id_sala}")
async def get_cadeira_by_id_sala(id_sala: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    _cadeira = crud.get_cadeira_by_id_sala(db, id_sala, skip, limit)
    return Response(status="Ok", code="200", message="Success fetch all data", result=_cadeira)
