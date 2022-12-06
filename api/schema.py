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

class Response(GenericModel, Generic[T]):
    code:str
    status: str
    message: str
    result: Optional[T]