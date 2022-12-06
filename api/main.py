from fastapi import FastAPI
import models
from config import engine
from tables import cliente, filmes

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(cliente.router)
app.include_router(filmes.router)