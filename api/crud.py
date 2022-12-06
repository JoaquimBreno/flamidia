from sqlalchemy.orm import Session
from models import Cliente
from schema import ClienteSchema

def get_cliente(db: Session, skipt: int = 0, limit: int = 100):
    return db.query(Cliente).offset(skipt).limit(limit).all()

def get_cliente_by_id(db: Session, Cliente_id: int):
    return db.query(Cliente).filter(Cliente.id_cliente == Cliente_id).first()
