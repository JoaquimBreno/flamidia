from sqlalchemy.orm import Session
from models import Cliente, Filme, Ingresso
from schema import ClienteSchema, FilmeSchema, IngressoSchema

def get_cliente(db: Session, skipt: int = 0, limit: int = 100):
    return db.query(Cliente).offset(skipt).limit(limit).all()

def get_cliente_by_id(db: Session, Cliente_id: int):
    return db.query(Cliente).filter(Cliente.id_cliente == Cliente_id).first()

def get_filme(db: Session, skipt: int = 0, limit: int = 100):
    return db.query(Filme).offset(skipt).limit(limit).all()

def create_filme(db: Session, filme: FilmeSchema):
    _filme = Filme(
        # id_filme=filme.id_filme,
        # categoria=filme.categoria,
        # produtora=filme.produtora,
        # atores=filme.atores,
        # nacionalidade=filme.nacionalidade,
        # faixa_etaria=filme.faixa_etaria
        **filme.dict()
    )
    db.add(_filme)
    db.commit()
    db.refresh(_filme)
    return _filme

def create_ingresso(db: Session, ingresso: IngressoSchema):
    _ingresso = Ingresso(
        id_ingresso=ingresso.id_ingresso,
        id_sessao=ingresso.id_sessao,
        id_compra=ingresso.id_compra,
        id_cadeira=ingresso.id_cadeira,
        quantidade=ingresso.quantidade,
        preco=ingresso.preco
    )
    db.add(_ingresso)
    db.commit()
    db.refresh(_ingresso)
    return _ingresso
