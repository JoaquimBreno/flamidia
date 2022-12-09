from fastapi import APIRouter, HTTPException, Path
from fastapi import Depends
from config import SessionLocal
from sqlalchemy.orm import Session
from schema import CompraSchema, Response, RequestCompra

import crud

router = APIRouter(
    prefix="/compra", 
    tags=["compra"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/create")
async def create_compra_service(request: RequestCompra, db: Session = Depends(get_db)):
    crud.create_compra(db, compra=request.parameter)
    return Response(status="Ok",
                    code="200",
                    message="Compra created successfully").dict(exclude_none=True)
