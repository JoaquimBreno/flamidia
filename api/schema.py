from pydantic import BaseModel, Field
from typing import List, Optional, Generic, TypeVar
from pydantic.generics import GenericModel

T = TypeVar('T')

############ CLIENTE ############
class ClienteSchema(BaseModel):
    id_cliente = int
    nome = str
    estudante = bool
    flamengo = bool
    idade = int

    class Config:
        orm_mode = True

class RequestCliente(BaseModel):
    parameter: ClienteSchema = Field(...)

############ FILME ############
class FilmeSchema(BaseModel):
    id_filme : Optional[str] = None
    categoria : Optional[str] = None
    produtora : Optional[str] = None
    atores : Optional[str] = None
    nacionalidade: Optional[str] = None
    faixa_etaria: Optional[str] = None

    class Config:
        orm_mode = True

class RequestFilme(BaseModel):
    parameter: FilmeSchema = Field(...)

############ INGRESSO ############
class IngressoSchema(BaseModel):
    id_ingresso : Optional[int] = None
    id_sessao : Optional[int] = None
    id_compra : Optional[int] = None
    id_cadeira : Optional[int] = None
    quantidade : Optional[int] = None
    preco : Optional[float] = None

    class Config:
        orm_mode = True

class RequestIngresso(BaseModel):
    parameter: IngressoSchema = Field(...)

############ Cadeira ############
class CadeiraSchema(BaseModel):
    id_cadeira : Optional[int] = None
    id_sala : Optional[int] = None

    class Config:
        orm_mode = True

class RequestCadeira(BaseModel):
    parameter: CadeiraSchema = Field(...)

############ Sala ############
class SalaSchema(BaseModel):
    id_sala : Optional[int] = None
    capacidade : Optional[int] = None

    class Config:
        orm_mode = True

class RequestSala(BaseModel):
    parameter: SalaSchema = Field(...)

############ Sessao ############
class SessaoSchema(BaseModel):
    id_sessao : Optional[int] = None
    id_filme : Optional[int] = None
    id_sala : Optional[int] = None
    data : Optional[str] = None
    horario_inicio : Optional[str] = None
    horario_fim : Optional[str] = None

    class Config:
        orm_mode = True

class RequestSessao(BaseModel):
    parameter: SessaoSchema = Field(...)

############ Compra ############
class CompraSchema(BaseModel):
    id_compra : Optional[int] = None
    id_cliente : Optional[int] = None
    forma_de_pagamento : Optional[int] = None
    class Config:
        orm_mode = True

class RequestCompra(BaseModel):
    parameter: CompraSchema = Field(...)

############ Lanchonete ############
class LanchoneteSchema(BaseModel):
    id_oferta : Optional[int] = None
    nome : Optional[str] = None
    preco : Optional[float] = None
    qtde_itens : Optional[int] = None
    class Config:
        orm_mode = True

class RequestLanchonete(BaseModel):
    parameter: LanchoneteSchema = Field(...)

############ Pedido ############
class PedidoSchema(BaseModel):
    id_pedido : Optional[int] = None
    id_oferta : Optional[int] = None
    id_compra : Optional[int] = None

    class Config:
        orm_mode = True

class RequestPedido(BaseModel):
    parameter: PedidoSchema = Field(...)


class Response(GenericModel, Generic[T]):
    code:str
    status: str
    message: str
    result: Optional[T]
