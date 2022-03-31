import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainNavbar.css';

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
            <input className='search-input' type="text" name="search" placeholder="Search" value={query.toLowerCase()} onChange={handleQueryChange}></input>
            <button className='search' onClick={handleSearch}>Search</button>
        </li>
    )}

    export default Search;


