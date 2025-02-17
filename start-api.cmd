python3 -m venv ./.venv
. ./.venv/bin/activate

cd api
pip install -r requirements.txt

python3 -m fastapi dev main.py
