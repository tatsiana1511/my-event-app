import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Search() {
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleQueryChange = (evt) => {
        setQuery(evt.target.value);
        setError('');
    }

    const handleSearch = () => {
        navigate('/experiences/?searchTerm='+ query);
    }

    return (
        <li className='nav-item'>
            <input type="text" name="search" placeholder="Search" value={query} onChange={handleQueryChange}></input>
            <button onClick={handleSearch}>Search</button>
        </li>
    )}

    export default Search;


