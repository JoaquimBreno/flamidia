from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Float, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

Base  = declarative_base()

class Cliente(Base):
    __tablename__ = 'cliente'
    id_cliente = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nome = Column(String)
    estudante = Column(Boolean)
    flamengo = Column(Boolean)
    idade = Column(Integer)
    compra = relationship("Compra", back_populates="cliente")

class Filme(Base):
    __tablename__ = 'filme'
    id_filme = Column(Integer, primary_key=True, index=True, autoincrement=True)
    categoria = Column(String)
    produtora = Column(String)
    atores = Column(String)
    nacionalidade = Column(String)
    faixa_etaria = Column(Integer)

class Sessao(Base):
    __tablename__ = 'sessao'
    id_sessao = Column(Integer, primary_key=True, index=True, autoincrement=True)
    id_filme = Column(Integer, ForeignKey('filme.id_filme'))
    id_sala = Column(Integer, ForeignKey('sala.id_sala'))
    data = Column(DateTime(timezone=True), server_default=func.now())
    horario_inicio = Column(String)
    horario_fim = Column(String)
    filme=relationship("Filme", foreign_keys=[id_filme])
    sala=relationship("Sala", foreign_keys=[id_sala])
    ingresso= relationship("Ingresso", back_populates="sessao")


class Ingresso(Base):
    __tablename__ = 'ingresso'
    id_ingresso = Column(Integer, primary_key=True, index=True, autoincrement=True)
    id_sessao = Column(Integer, ForeignKey('sessao.id_sessao'))
    id_compra = Column(Integer, ForeignKey('compra.id_compra'))
    id_cadeira = Column(Integer)
    quantidade = Column(Integer)
    preco = Column(Float)
    sessao=relationship("Sessao", foreign_keys=[id_sessao], back_populates="ingresso")
    compra=relationship("Compra", foreign_keys=[id_compra], back_populates="ingresso")

class Cadeira(Base):
    __tablename__ = 'cadeira'
    id_cadeira = Column(Integer, primary_key=True, index=False)
    id_sala = Column(Integer, ForeignKey('sala.id_sala'))
    sala=relationship("Sala", foreign_keys=[id_sala], back_populates="cadeira")

class Sala(Base):
    __tablename__ = 'sala'
    id_sala = Column(Integer, primary_key=True, index=True)
    capacidade = Column(Integer)
    cadeira=relationship("Cadeira", back_populates="sala")

class Compra(Base):
    __tablename__ = 'compra'
    id_compra = Column(Integer, primary_key=True, index=True, autoincrement=True)
    id_cliente = Column(Integer, ForeignKey('cliente.id_cliente'))
    forma_de_pagamento = Column(Integer)
    cliente=relationship("Cliente", foreign_keys=[id_cliente], back_populates="compra")
    ingresso=relationship("Ingresso", back_populates="compra")
    pedidos=relationship("Pedido", back_populates="compra")

class Pedido(Base):
    __tablename__ = 'pedidos'
    id_pedido = Column(Integer, primary_key=True, index=True, autoincrement=True)
    id_oferta = Column(Integer, ForeignKey('lanchonete.id_oferta'))
    id_compra = Column(Integer, ForeignKey('compra.id_compra'))
    compra=relationship("Compra", foreign_keys=[id_compra], back_populates="pedidos")
    lanchonete=relationship("Lanchonete", foreign_keys=[id_oferta], back_populates="pedidos")

class Lanchonete(Base):
    __tablename__ = 'lanchonete'
    id_oferta = Column(Integer, primary_key=True, index=True, autoincrement= True)
    nome = Column(String)
    preco = Column(Float)
    qtde_itens= Column(Integer)
    pedidos=relationship("Pedido", back_populates="lanchonete")