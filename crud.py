from sqlalchemy.orm import Session
from models import Cliente, Filme, Ingresso, Cadeira, Sessao, Lanchonete, Pedido, Compra
from schema import ClienteSchema, FilmeSchema, IngressoSchema, SessaoSchema, PedidoSchema, CompraSchema

############ CLIENTE ############
def get_cliente(db: Session, skipt: int = 0, limit: int = 100):
    return db.query(Cliente).offset(skipt).limit(limit).all()

def get_cliente_by_id(db: Session, Cliente_id: int):
    return db.query(Cliente).filter(Cliente.id_cliente == Cliente_id).first()

def create_cliente(db: Session, cliente: ClienteSchema):
    _cliente = cliente(
        **cliente.dict()
    )
    db.add(_cliente)
    db.commit()
    db.refresh(_cliente)
    return _cliente

############ INGRESSO ############
def get_ingresso(db: Session, skipt: int = 0, limit: int = 100):
    return db.query(Ingresso).offset(skipt).limit(limit).all()

def create_ingresso(db: Session, ingresso: IngressoSchema):
    _ingresso = Ingresso(
        **ingresso.dict()
    )
    db.add(_ingresso)
    db.commit()
    db.refresh(_ingresso)
    return _ingresso

############ CADEIRA ############
def get_cadeira_by_id_sala(db: Session, id_sala: int, skipt: int = 0, limit: int = 100):
    return db.query(Cadeira).filter(Cadeira.id_sala == id_sala).all()

############ SESSAO ############
def get_sessao_by_id_filme(db: Session, id_filme: int, skipt: int = 0, limit: int = 100):
    return db.query(Sessao).filter(Sessao.id_filme == id_filme).all()

def create_sessao(db: Session, sessao: SessaoSchema):
    _sessao = Sessao(
        **sessao.dict()
    )
    db.add(_sessao)
    db.commit()
    db.refresh(_sessao)
    return _sessao

############ FILME ############
def get_filme(db: Session, skipt: int = 0, limit: int = 100):
    return db.query(Filme).offset(skipt).limit(limit).all()

def create_filme(db: Session, filme: FilmeSchema):
    _filme = Filme(
        **filme.dict()
    )
    db.add(_filme)
    db.commit()
    db.refresh(_filme)
    return _filme

############ LANCHONETE ############

def get_lanchonete(db: Session, skipt: int = 0, limit: int = 100):
    return db.query(Lanchonete).offset(skipt).limit(limit).all()

############ COMPRA ############

def create_compra(db: Session, compra: CompraSchema):
    _compra = Compra(
        **compra.dict()
    )
    db.add(_compra)
    db.commit()
    db.refresh(_compra)
    return _compra

############ PEDIDO ############

def create_pedido(db: Session, pedido: PedidoSchema):
    _pedido = Pedido(
        **pedido.dict()
    )
    db.add(_pedido)
    db.commit()
    db.refresh(_pedido)
    return _pedido