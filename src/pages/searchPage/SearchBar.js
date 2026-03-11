// src/components/SearchBar.js
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/searchBar.css';

const SearchBar = ({ placeholder = "Поиск аниме...", maxLength = 25 }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const searchTimeoutRef = useRef(null);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    // Обработка отправки формы поиска
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
        }
    };

    // Обработка клавиши Enter
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchSubmit(e);
        }
    };

    // Обработка изменений в поле поиска
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
    };

    // Очистка таймаута при размонтировании
    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="minimal-search" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="search-form">
                <input
                    type="text"
                    placeholder={placeholder}
                    autoComplete="off"
                    maxLength={maxLength}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    className="search-input"
                />
                <button type="submit" className="search-submit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--tt)" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default SearchBar;