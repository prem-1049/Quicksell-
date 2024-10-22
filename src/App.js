import React, { useState } from 'react';
import KanbanBoard from './components/KanbanBoard';
import useFetchData from './hooks/useFetchData';

const App = () => {
    const { data, loading, error } = useFetchData('https://api.quicksell.co/v1/internal/frontend-assignment');
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;

    return (
        <div className="app">
            <h2>Kanban Board</h2>
            <KanbanBoard data={data} />
        </div>
    );
};

export default App;
