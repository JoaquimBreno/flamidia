from pydantic import BaseModel, Field
from typing import List, Optional, Generic, TypeVar
from pydantic.generics import GenericModel

T = TypeVar('T')
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


class Response(GenericModel, Generic[T]):
    code:str
    status: str
    message: str
    result: Optional[T]