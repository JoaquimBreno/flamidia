from pydantic import BaseModel


class Filme(BaseModel):
    id: int
    nome: str
    rating: int
    author_id: int

    class Config:
        orm_mode = True