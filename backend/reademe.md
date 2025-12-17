# README for VectorShift Assignment Backend

This folder contains the FastAPI backend for the pipeline validation service.

## Setup

1. (Optional) Create and activate a Python virtual environment:

   python -m venv .venv

   # On Windows (Git Bash):

   source .venv/Scripts/activate

   # On Unix/Mac:

   source .venv/bin/activate

2. Install dependencies:

   pip install -r requirements.txt

3. Run the backend server:

   uvicorn main:app --reload --host 0.0.0.0 --port 8000

You should see:

- `http://localhost:8000/` returns `{"Ping": "Pong"}`

## API

### POST `/pipelines/parse`

Request body (JSON):

```json
{
  "nodes": [{ "id": "customInput-1" }, { "id": "text-1" }],
  "edges": [{ "source": "customInput-1", "target": "text-1" }]
}
```

Response:

```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true
}
```

- `num_nodes`: Number of nodes submitted.
- `num_edges`: Number of edges submitted.
- `is_dag`: `true` if the provided graph forms a Directed Acyclic Graph (DAG); otherwise `false`.

## Notes

- CORS is enabled for `http://localhost:3000` to allow frontend development.
- No database or file I/O is needed.
- See root `README.md` for end-to-end setup, frontend usage, and deployment tips.
