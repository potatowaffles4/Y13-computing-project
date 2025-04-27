import json
from uuid import uuid4
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

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

# defines the layout of input data for artist
class Artist(BaseModel):
    fName:str
    lName: str
    yearBorn: str
    whereBorn: str
    live: str
    knownFor: str
    yearDied: str
    artPeriod: str
    imageUrl: str

# defines the layout of input data for a tag
class Tag(BaseModel):
    name:str
    artistId: Optional[str] = None
    artworkId: Optional[str] = None

# loads the artwork database so it can be read when a search happens 
# def load_artworks():
#     db = open("./art-database.json")
#     artworks = json.loads(db.read())
#     db.close()

#     print(f"artworks: {json.dumps(artworks, indent=4)}")
#     return artworks

# loads the art database so it can be read when a search happens 
def load_artists():
    db = open("./artist-database.json")
    artists = json.loads(db.read())
    db.close()

    print(f"artists: {json.dumps(artists, indent=4)}")
    return artists

def load_tags():
    db = open("./tag-database.json")
    tags = json.loads(db.read())
    db.close()

    print(f"tags: {json.dumps(tags, indent=4)}")
    return tags

#adds artist to artist, opens the database and writes in the artist information 
def save_artist(artist):
    artists = load_artists()
    artists.append(artist)

    db = open("./artist-database.json", "w")
    db.write(json.dumps(artists, indent=4))
    db.close()

#adds tag to tag, opens the database and writes in the tag information 
def save_tag(tag):
    tags = load_tags()
    tags.append(tag)

    db = open("./tag-database.json", "w")
    db.write(json.dumps(tags, indent=4))
    db.close()

@app.get("/art/search")
async def get_art_search(keywords: str = ""):
    keywords = keywords.split(",")

    # artworks = load_artworks()
    artists = load_artists()
    tags = load_tags()
    items = []

    for k in keywords:
        keyword = k.lower()
        # for artwork in artworks:
        #     print(artwork)
        #     if keyword in artwork['tags']:
        #         found = artwork
        #         found["type"] = "artwork"
        #         items.append(found)

        for artist in artists:
            print(artist)
            if keyword in artist["fName"].lower() or keyword in artist["lName"].lower():
                found = artist
                found["type"] = "artist"
                items.append(found)

        for tag in tags:
            print(tag)
            if keyword in tag["name"]:
                if tag["artistId"]:
                    for artist in artists:
                        if tag["artistId"] == artist["id"]:
                            found = artist
                            found["type"] = "artist"
                            items.append(found)

    response = {
        "keywords": keywords,
        "results": {
            "length": len(items),
            "items": items,
        }
    }

    print(f"response: {response}")

    return response

# @app.get("/artwork/{id}")
# async def get_artwork(id: str = ""):
#     artworks = load_artworks()

#     for artwork in artworks:
#         print(artwork)
#         if id in artwork['id']:
#             return artwork

#     return {}


@app.get("/artist/{id}")
async def get_artist(id: str = ""):
    artists = load_artists()

    for artist in artists:
        print(artist)
        if id in artist['id']:
            return artist

    return {}

@app.post("/artist")
async def post_artist(artist: Artist):
    artist_with_id = artist.model_dump() | { "id": str(uuid4()) }
    print(f"artist: {json.dumps(artist_with_id, indent=4)}")
    
    save_artist(artist_with_id)
    return {
        "ok": True,
        "artist": artist_with_id,
    }

@app.post("/tag")
async def post_tag(tag: Tag):
    tag_with_id = tag.model_dump() | { "id": str(uuid4()) }
    print(f"tag: {json.dumps(tag_with_id, indent=4)}")

    save_tag(tag_with_id)
    return {
        "ok": True,
        "tag": tag_with_id,
    }
