import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

function Search() {
    const [query, setQuery] = useState('')

    const handleQueryChange = (evt) => {
        setQuery(evt.target.value);
        setError('');
    }

    const handleSearch = () => {
        Navigate('/experiences/?searchTerm='+{query});
    }

    return (
        <div>
            <input type="text" name="search" placeholder="Search" value={query} onChange={handleQueryChange}></input>
            <button onClick={handleSearch}>Search</button>
        </div>
    )}


