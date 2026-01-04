import { useStore } from './store';

// TODO: Move it to .env or Constant folder
const BASE_URL = 'http://localhost:8000';

export const SubmitButton = ({ className }) => {
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges,
    }));

    const handleSubmit = async () => {
        try {
            const pipeline = { nodes, edges };
            const response = await fetch(`${BASE_URL}/pipelines/parse`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pipeline),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const { num_nodes, num_edges, is_dag } = data;
            const message = `Pipeline Analysis:\n\nNodes: ${num_nodes}\nEdges: ${num_edges}\nIs DAG: ${is_dag ? 'Yes' : 'No'}`;
            alert(message);
        } catch (error) {
            alert(`Error submitting pipeline: ${error.message}`);
        }
    };

    return (
        <button className={className} type="button" onClick={handleSubmit}>Submit</button>
    );
};
