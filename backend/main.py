from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any


class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]


class Edge(BaseModel):
    source: str
    target: str
    sourceHandle: str = None
    targetHandle: str = None


class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


"""Check if the given nodes and edges form a directed acyclic graph (DAG)"""
def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    if not edges:
        return True

    adj = {node.id: [] for node in nodes}
    edge_count = {node.id: 0 for node in nodes}

    for edge in edges:
        if edge.source in adj:
            adj[edge.source].append(edge.target)
            if edge.target in edge_count:
                edge_count[edge.target] += 1

    # BFS Algo approach
    queue = [node_id for node_id in edge_count if edge_count[node_id] == 0]
    sorted_count = 0

    while queue:
        node = queue.pop(0)
        sorted_count += 1
        for neighbor in adj[node]:
            edge_count[neighbor] -= 1
            if edge_count[neighbor] == 0:
                queue.append(neighbor)

    return sorted_count == len(nodes)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag_result = is_dag(pipeline.nodes, pipeline.edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag_result,
    }
