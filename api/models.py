from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Float, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

Base  = declarative_base()

class Cliente(Base):
    __tablename__ = 'cliente'
    id_cliente = Column(Integer, primary_key=True, index=True)
    nome = Column(String)
    estudante = Column(Boolean)
    flamengo = Column(Boolean)
    idade = Column(Integer)