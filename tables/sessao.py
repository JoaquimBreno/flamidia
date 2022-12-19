from fastapi import APIRouter, HTTPException, Path
from fastapi import Depends
from config import SessionLocal
from sqlalchemy.orm import Session
from schema import SessaoSchema, Response, RequestSessao

import crud

router = APIRouter(
    prefix="/sessao",
    tags=["sessao"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/sessao/create")
async def create_sessao_service(request: RequestSessao, db: Session = Depends(get_db)):
    crud.create_sessao(db, sessao=request.parameter)
    return Response(status="Ok",
                    code="200",
                    message="Sessao created successfully").dict(exclude_none=True)


@router.get("/id/sessao/{id_filme}")
async def get_sessao_by_id_filme(id_filme: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    _sessao = crud.get_sessao_by_id_filme(db, id_filme, skip, limit)
    return Response(status="Ok", code="200", message="Success fetch all data", result=_sessao)
