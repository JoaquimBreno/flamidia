from fastapi import APIRouter, HTTPException, Path
from fastapi import Depends
from config import SessionLocal
from sqlalchemy.orm import Session
from schema import FilmeSchema, Response, RequestFilme

import crud

router = APIRouter(
    prefix="/filme", 
    tags=["filme"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
async def get_filme(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    _filme = crud.get_filme(db, skip, limit)
    return Response(status="Ok", code="200", message="Success fetch all data", result=_filme)

@router.post("/create")
async def create_filme_service(request: RequestFilme, db: Session = Depends(get_db)):
    crud.create_filme(db, filme=request.parameter)
    return Response(status="Ok",
                    code="200",
                    message="Filme created successfully").dict(exclude_none=True)
