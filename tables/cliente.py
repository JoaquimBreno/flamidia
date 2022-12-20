from fastapi import APIRouter, HTTPException, Path
from fastapi import Depends
from config import SessionLocal
from sqlalchemy.orm import Session
from schema import ClienteSchema, Response, RequestCliente

import crud

router = APIRouter(
    prefix="/cliente", 
    tags=["cliente"]
)


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

@router.get("/{id_cliente}")
async def get_cliente_by_id(id_cliente: int = Path(..., title="The ID of the cliente to get"), db: Session = Depends(get_db)):
    _cliente = crud.get_cliente_by_id(db, id_cliente)
    if _cliente is None:
        raise HTTPException(status_code=404, detail="Cliente not found")
    return Response(status="Ok", code="200", message="Success fetch data", result=_cliente)

@router.post("/create")
async def create_cliente(request: RequestCliente, db: Session = Depends(get_db)):
    _cliente = crud.create_cliente(db, request)
    return Response(status="Ok", code="200", message="Success create data", result=_cliente)

