from fastapi import FastAPI

app = FastAPI()

@app.get("/art/search")
async def art_search(keywords: str = ""):
    return {
        "message": "hello world",
        "keywords": keywords,
        "results": {
            "length": 2,
            "items": [
                {
                    "id": "1",
                    "artist": "Monet",
                    "title": "Water Lillies",
                    "year": "1920",
                },
                {
                    "id": "2",
                    "artist": "Van Gogh",
                    "title": "Starry Night",
                    "year": "1889"
                }
            ]
        }
    }
