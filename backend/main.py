from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
from collections import defaultdict, deque

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://vectorshift-assessment-one.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,     # or ["*"] for dev
    allow_credentials=True,
    allow_methods=["*"],       # or ["GET", "POST", "OPTIONS"]
    allow_headers=["*"],
)


class Node(BaseModel):
    id: str


class Edge(BaseModel):
    source: str
    target: str


class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    # collect all node ids (include ones only mentioned in edges)
    node_ids = {n.id for n in nodes}
    for e in edges:
        node_ids.add(e.source)
        node_ids.add(e.target)

    indegree: Dict[str, int] = {nid: 0 for nid in node_ids}
    adj: Dict[str, List[str]] = defaultdict(list)

    for e in edges:
        adj[e.source].append(e.target)
        indegree[e.target] += 1

    queue = deque([nid for nid, deg in indegree.items() if deg == 0])
    visited = 0

    while queue:
        u = queue.popleft()
        visited += 1
        for v in adj[u]:
            indegree[v] -= 1
            if indegree[v] == 0:
                queue.append(v)

    return visited == len(node_ids)


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag = is_dag(pipeline.nodes, pipeline.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": dag,
    }
