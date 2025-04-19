'use client';

import React, { useState } from 'react';

interface SearchInputProps {
    onSearch: (query: string) => void;
    placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
    onSearch,
    placeholder = 'Search podcasts...'
}) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div className="search-input-container">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="search-input"
            />
            <button onClick={handleSearch} className="search-button">
                Search
            </button>
        </div>
    );
};

export default SearchInput;