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


@app.get("/artist/{id}")
async def artwork_get(id: str = ""):
    artists = [
        {
            "id": "1",
            "name": "Pablo Picasso",
            "country": "Spain",
            "image_url": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbirthdaypedia.com%2Fi%2Ft%2Fpablo-picasso.jpg&f=1&nofb=1&ipt=2fd3ff6000516c46535a0ec7c94dac5d97afbb40b56594b55fdd9e44ca44e41a&ipo=images"
        },
        {
            "id": "2",
            "name": "David Hockney",
            "country": "United Kingdom",
            "image_url": "https://observer.com/wp-content/uploads/sites/2/2018/04/gettyimages-615380796-e1524080376439.jpg"
        }
    ]

    for artist in artists:
        print(artist)
        if id in artist['id']:
            return artist

    return {}
