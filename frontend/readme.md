# VectorShift Assignment – Frontend

This folder contains the **React** app and drag-and-drop pipeline builder for the assignment.

## Setup

1. Make sure you have installed [Node.js](https://nodejs.org/) (v14 or higher) and [npm](https://www.npmjs.com/) (comes with Node).
2. From the project root, run:

   ```bash
   cd frontend
   npm install
   npm start
   ```

3. The app will be available at [http://localhost:3000](http://localhost:3000).

> **Note:** The backend FastAPI server should be running on `http://localhost:8000` for pipeline validation to work.

## Usage

- Drag nodes (Input, LLM, Output, Text, Transform) from the sidebar onto the React Flow canvas.
- Connect nodes by clicking and dragging from one node handle to another.
- Edit node details (where available) by clicking on a node.
- Click **Submit** to send your pipeline (nodes and edges) to the backend for validation.

The backend will respond with the number of nodes, edges, and whether your pipeline forms a **DAG**.

## Directory Structure

- `src/` — React source code
  - `components/` — Custom React Flow nodes and UI components
  - `submit.js` — Handles API POST to `/pipelines/parse`
- `public/` — Static assets

## Development

- You can edit or add node types in `src/components/ReusableNode.jsx`.
- Adjust the API endpoint in `src/submit.js` as necessary (default: `http://localhost:8000/pipelines/parse`).

## Troubleshooting

- If you see CORS errors, ensure the backend is running and has CORS enabled for `http://localhost:3000`.

## Testing

The React app was bootstrapped with Create React App (`CRA`), so you can run the default tests:

```bash
npm test
```

## See Also

- See the project root (`../README.md`) or `../backend/readme.md` for backend/API setup and overall usage.
- Typical backend output from a valid submission:

  ```json
  {
    "num_nodes": 2,
    "num_edges": 1,
    "is_dag": true
  }
  ```
