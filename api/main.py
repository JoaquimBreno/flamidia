from fastapi import FastAPI
import models
from config import engine
from tables import cliente, filmes, ingresso, sessao, cadeiras, pedido, compra, lanchonete

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(cliente.router)
app.include_router(filmes.router)
app.include_router(ingresso.router)
app.include_router(sessao.router)
app.include_router(cadeiras.router)
app.include_router(pedido.router)
app.include_router(compra.router)
app.include_router(lanchonete.router)