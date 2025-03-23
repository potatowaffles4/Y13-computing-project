python -m venv .\.venv
call .\.venv\Scripts\activate

cd api
pip install -r requirements.txt

python -m fastapi dev main.py
