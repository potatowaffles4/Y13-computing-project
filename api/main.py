import json
from uuid import uuid4
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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

class Artist(BaseModel):
    name: str
    yearBorn: str
    whereBorn: str
    live: str
    knownFor: str
    yearDied: str
    artPeriod: str

def load_artworks():
    db = open("./art-database.json")
    artworks = json.loads(db.read())
    db.close()

    print(f"artworks: {json.dumps(artworks, indent=4)}")
    return artworks

def load_artists():
    db = open("./artist-database.json")
    artists = json.loads(db.read())
    db.close()

    print(f"artists: {json.dumps(artists, indent=4)}")
    return artists

def save_artist(artist):
    artists = load_artists()
    artists.append(artist)

    db = open("./artist-database.json", "w")
    db.write(json.dumps(artists, indent=4))
    db.close()

@app.get("/art/search")
async def get_art_search(keywords: str = ""):
    keywords = keywords.split(",")

    artworks = load_artworks()
    artists = load_artists()
    items = []

    for keyword in keywords:
        for artwork in artworks:
            print(artwork)
            if keyword in artwork['tags']:
                found = artwork
                found["type"] = "artwork"
                items.append(found)

        for artist in artists:
            print(artist)
            if keyword in artist['tags']:
                found = artist
                found["type"] = "artist"
                items.append(found)

    return {
        "message": "hello world",
        "keywords": keywords,
        "results": {
            "length": len(items),
            "items": items,
        }
    }

@app.get("/artwork/{id}")
async def get_artwork(id: str = ""):
    artworks = load_artworks()

    for artwork in artworks:
        print(artwork)
        if id in artwork['id']:
            return artwork

    return {}


@app.get("/artist/{id}")
async def get_artist(id: str = ""):
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
        },
        {
            "id": "3",
            "name": "Claude Monet",
            "country": "France",
            "image_url": "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F3%2F33%2FClaude_Monet_1899_Nadar.jpg&f=1&nofb=1&ipt=3b88e2ea59efbbd851908f0abbd586962b6b30d0905c1d1bc9377fbe23049299&ipo=images"
        },
        {
            "id": "4",
            "name": "Vincent Van Gogh",
            "country": "Netherlands",
            "image_url": "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F6%2F60%2FVincent_Willem_van_Gogh_107.jpg&f=1&nofb=1&ipt=2a428db71f93544de6cf9bba3c4f1f61f9e79cd7f6b0fd12852669fafbab8c7d&ipo=images"
        },
    ]

    for artist in artists:
        print(artist)
        if id in artist['id']:
            return artist

    return {}

@app.post("/artist")
async def post_artist(artist: Artist):
    artist_with_id = artist.model_dump() | { "id": str(uuid4()) }
    print(f"artist: {json.dumps(artist, indent=4)}")
    
    save_artist(artist_with_id)
    return {"ok": True}

