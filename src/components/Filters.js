// Filters.js
import React, { useState } from 'react';
import { ReactComponent as DisplayIcon1 } from './Display.svg'; // Adjust the path to your SVG file


const Filters = ({ setGroupBy, setSortBy }) => {
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);

    const handleToggleFilters = () => {
        setIsFiltersVisible(!isFiltersVisible);
    };

    return (
        <div className="filters">
            <button onClick={handleToggleFilters}><DisplayIcon1 width="15" height="15" />Filter</button>
            {isFiltersVisible && (
                <div className="filters">
                    <label>
                        Group By:
                        <select onChange={(e) => setGroupBy(e.target.value)}>
                            <option value="status">Status</option>
                            <option value="user">User</option>
                            <option value="priority">Priority</option>
                        </select>
                    </label>
                    <label>
                        Sort By:
                        <select onChange={(e) => setSortBy(e.target.value)}>
                            <option value="title">Title</option>
                            <option value="priority">Priority</option>
                        </select>
                    </label>
                </div>
            )}
        </div>
    );
};

export default Filters;
