// submit.js
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);

    const handleSubmit = (e) => {
        e.preventDefault?.(); // safe even if not inside a form
        fetch('http://localhost:8000/pipelines/parse', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nodes, edges }),
        })
            .then(res => res.json())
            .then(data => {
                alert(JSON.stringify({
                    num_nodes: data.num_nodes,
                    num_edges: data.num_edges,
                    is_dag: data.is_dag
                }));
            })
            .catch(error => {
                console.error('Submission error:', error);
            });
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button
                style={{
                    background: 'indigo',
                    color: 'white',
                    padding: '16px 32px',
                    borderRadius: '5px',
                    border: 'none',
                    fontSize: '16px',
                    cursor: 'pointer',
                }}
                type="submit"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    );
};