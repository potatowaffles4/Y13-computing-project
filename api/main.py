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

artworks = [
{
    "id": "1",
    "artist": "Monet",
    "title": "Water Lillies",
    "year": "1920",
    "tags": ["abc", "ghi"]
},
{
    "id": "2",
    "artist": "Van Gogh",
    "title": "Starry Night",
    "year": "1889",
    "tags": ["def", "ghi"]
}
]

@app.get("/art/search")
async def art_search(keywords: str = ""):
    keywords = keywords.split(",")

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

@app.get("/artwork")
async def artwork_get(id: str = ""):
    items = []

    for artwork in artworks:
        print(artwork)
        if id in artwork['id']:
            return artwork

    return {}
