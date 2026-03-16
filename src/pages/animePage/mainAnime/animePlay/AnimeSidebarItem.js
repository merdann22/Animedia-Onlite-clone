// animePlay/AnimeSidebarItem.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/main-anime/anime-sidebar-items.css'

const AnimeSidebarItem = ({ anime }) => {
    return (
        <Link to={`/anime/${anime.mal_id}`} className="anime-sidebar-item" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="sidebar-item-container">
                <div className="sidebar-item-image">
                    <img
                        src={anime.images?.jpg?.image_url}
                        alt={anime.title}
                        className="anime-image"
                    />
                </div>

                <div className="sidebar-item-info">
                    <div className="sidebar-item-title">
                        <p style={{fontSize: '14px', marginBottom: '5px'}}>{anime.title}</p>
                        <p style={{fontSize: '12px', opacity: '0.5'}}>
                            {anime.broadcast?.day || 'Неизвестно'}, {anime.broadcast?.time || 'Неизвестно'}
                        </p>
                    </div>
                </div>
                <div className="sidebar-item-series">
                    <span>{anime.episodes || 'N/A'}</span>
                    <span> серии</span>
                </div>
            </div>
        </Link>
    );
};

export default AnimeSidebarItem;