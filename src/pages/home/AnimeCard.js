import React from 'react';
import './style/animeCard.css';
import { Link } from 'react-router-dom';

const AnimeCard = ({ anime }) => {
    return (
        <Link to={`/anime/${anime.mal_id}`} className="anime-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="anime-image-container">
                <div>
                    <img
                        src={anime.images?.jpg?.image_url}
                        alt={anime.title}
                        className="anime-image"
                    />
                </div>

                <div className="anime-info">
                    <div className="anime-title">
                        <p style={{fontSize:'16px', marginBottom: '10px'}}>{anime.title}</p>
                        <p style={{fontSize:'13px', opacity: '0.5'}}>
                            {anime.broadcast?.day || 'Неизвестно'}, {anime.broadcast?.time || 'Неизвестно'}
                        </p>
                    </div>

                    <div className="anime-series">
                        <span>{anime.episodes || 'N/A'}</span>
                        <span>серии</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default AnimeCard;