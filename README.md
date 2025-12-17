# VectorShift Assignment

Pipeline builder with a **React + React Flow** frontend and a **FastAPI** backend that validates the pipeline and checks whether it forms a **directed acyclic graph (DAG)**.

- Frontend: React 18, Create React App, React Flow
- Backend: FastAPI + Uvicorn
- API: `POST /pipelines/parse` → `{ num_nodes, num_edges, is_dag }`

---

## Project Structure

- `frontend/` – React app with the drag‑and‑drop graph editor.
- `backend/` – FastAPI service that validates the pipeline.

---

## Prerequisites

- **Node.js** (>= 14) and **npm**
- **Python** (>= 3.9) and **pip**

On Windows, you can run commands from Git Bash or PowerShell.

---

## Backend Setup (FastAPI)

From the project root:

cd backend

# (optional) create virtualenv

python -m venv .venv

# activate (Git Bash)

source .venv/Scripts/activate

# install Python dependencies

pip install -r requirements.txtRun the backend:

uvicorn main:app --reload --host 0.0.0.0 --port 8000You should see:

- `http://localhost:8000/` → `{"Ping": "Pong"}`

### API: `/pipelines/parse`

**Endpoint**

- Method: `POST`
- URL: `/pipelines/parse`
- Body (JSON):

{
"nodes": [
{ "id": "customInput-1" },
{ "id": "text-1" }
],
"edges": [
{ "source": "customInput-1", "target": "text-1" }
]
}**Response**

{
"num_nodes": 2,
"num_edges": 1,
"is_dag": true
}This endpoint:

- Counts nodes and edges.
- Uses a topological-sort style algorithm to check whether the graph is a **DAG**.

Example `curl`:

curl -X POST http://localhost:8000/pipelines/parse \
 -H "Content-Type: application/json" \
 -d '{
"nodes": [{"id": "1"}, {"id": "2"}],
"edges": [{"source": "1", "target": "2"}]
}'---

## Frontend Setup (React + React Flow)

From the project root:

cd frontend
npm install
npm startThe app will start on `http://localhost:3000`.

The frontend:

- Renders a React Flow canvas (`PipelineUI`).
- Lets you drag node types (`Input`, `LLM`, `Output`, `Text`, `Transform`) from the toolbar onto the canvas.
- Uses a reusable node component (`ReusableNode`) that changes its internals based on `data.nodeType`.
- On **Submit**, sends `{ nodes, edges }` to the backend `/pipelines/parse` endpoint.

---

## Connecting Frontend and Backend

In `frontend/src/submit.js`, the submit handler calls:

fetch('http://localhost:8000/pipelines/parse', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ nodes, edges }),
})
.then((res) => res.json())
.then((data) => {
console.log('Pipeline parse result:', data);
});Make sure:

- Backend is running on port **8000**.
- CORS is configured in `backend/main.py` to allow `http://localhost:3000`.

---

## Deployment (Backend)

For a quick free deployment (e.g. **Render**):

1. Push this repo to GitHub.
2. On Render:
   - New → Web Service → connect repo.
   - Root directory: `backend`.
   - Build command: `pip install -r requirements.txt`
   - Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
3. Update the frontend `fetch` URL to the Render URL (e.g. `https://your-app.onrender.com/pipelines/parse`).

---

## Running Tests

This project is mainly interactive; there are no custom tests included yet.
You can still run CRA’s default test runner from `frontend/`:

cd frontend
npm test
