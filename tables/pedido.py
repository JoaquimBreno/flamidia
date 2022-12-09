from fastapi import APIRouter, HTTPException, Path
from fastapi import Depends
from config import SessionLocal
from sqlalchemy.orm import Session
from schema import PedidoSchema, Response, RequestPedido

import crud

router = APIRouter(
    prefix="/pedido", 
    tags=["pedido"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/create")
async def create_pedido_service(request: RequestPedido, db: Session = Depends(get_db)):
    crud.create_pedido(db, pedido=request.parameter)
    return Response(status="Ok",
                    code="200",
                    message="pedido created successfully").dict(exclude_none=True)
