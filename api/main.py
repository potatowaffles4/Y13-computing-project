import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def load_artworks():
    db = open("./art-database.json")
    artworks = json.loads(db.read())
    print("artworks", artworks)
    return artworks

@app.get("/art/search")
async def art_search(keywords: str = ""):
    keywords = keywords.split(",")

    artworks = load_artworks()
    items = []

    for keyword in keywords:
        for artwork in artworks:
            print(artwork)
            if keyword in artwork['tags']:
                items.append(artwork)

    return {
        "message": "hello world",
        "keywords": keywords,
        "results": {
            "length": 2,
            "items": items,
        }
    }

@app.get("/artwork/{id}")
async def artwork_get(id: str = ""):
    artworks = load_artworks()

    for artwork in artworks:
        print(artwork)
        if id in artwork['id']:
            return artwork

    return {}
