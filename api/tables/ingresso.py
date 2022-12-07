from fastapi import APIRouter, HTTPException, Path
from fastapi import Depends
from config import SessionLocal
from sqlalchemy.orm import Session
from schema import IngressoSchema, Response, RequestIngresso

import crud

router = APIRouter(
    prefix="/ingresso", 
    tags=["ingresso"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
async def get_ingresso(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    _ingresso = crud.get_ingresso(db, skip, limit)
    return Response(status="Ok", code="200", message="Success fetch all data", result=_ingresso)

@router.post("/create")
async def create_ingresso_service(request: RequestIngresso, db: Session = Depends(get_db)):
    crud.create_ingresso(db, Ingresso=request.parameter)
    return Response(status="Ok",
                    code="200",
                    message="Ingresso created successfully").dict(exclude_none=True)
