import {Link} from "react-router-dom";
import React from "react";
import logo from '../../../assets/images/logo192.png';
import '../styles/header-anime/animeInfo.css';
import AnimeTimer from "../../../components/AnimeTimer";

const AnimeInfo = ({ anime }) => {
    if (!anime) return <div>Данные не найдены</div>;

    const getStudios = () => {
        return anime.studios?.map(studio => studio.name).join(', ') || 'Не указано';
    };

    const getGenres = () => {
        return anime.genres?.map(genre => genre.name).join(', ') || 'Не указано';
    };

    const getSources = () => {
        return anime.sources?.map(source => source.name).join(', ') || 'Не указано';
    };


    return (
        <div>
            <section className="grid-about">
                <div className="anime-poster-name">«{anime.title}»</div>

                <div className="anime-poster-rating">
                    <div>
                        <img src="https://amedia.online/templates/Animedia1/images/logoanid.svg" style={{width: '20px', height: '20px', margin:'10px'}} alt="icon" />
                        {anime.score || 'Не указано'}
                    </div>
                </div>
                <div className="anime-poster-time">
                    {anime.status === "Currently Airing" && anime.broadcast?.day ? (
                        <AnimeTimer anime={anime} />
                    ) : (
                        <span style={{color: '#b1b1b1'}}>Не указано</span>
                    )}
                </div>
                <div className="amine-poster-series">
                    <div>
                        <span>{anime.episodes || 'Не указано'} серии</span>
                        <span>-{anime.aired.prop.to.day || 'Не указано'} {anime.aired.prop.to.month || ''}</span>
                    </div>

                </div>
                <div className="amine-poster-series2">

                </div>

                <div className="grid-poster">
                    <div
                        className="image-info-container"
                        style={{
                            backgroundImage: `linear-gradient(to top, rgb(0, 0, 0) 0%, transparent 50%), url(${anime.images?.jpg?.image_url})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            minHeight: '300px',
                            position: 'relative'
                        }}
                    >
                        <div className="eval-counter">
                            <div className="like">
                                <button className="eval-button">
                                    <img src={logo} alt=""/>
                                </button>
                                {anime.favorites || 0}
                            </div>
                            <div className="dislike">
                                <button className="eval-button">
                                    <img src={logo} alt=""/>
                                </button>
                                0
                            </div>
                        </div>
                    </div>
                    <button className="add_bookmarks">Добавить в закладки</button>
                </div>
                <ul className="anime-poster-info">
                    <div className="tags">
                        {getGenres().split(', ').map((genre, index) => (
                            <span key={index} className="tag">{genre}</span>
                        ))}
                    </div>
                    <li>
                        <span className="info__item">Вышла серия:</span>
                        <span className="info__value" style={{color:'#b1b1b1'}}>
                            <span className="last-series">{anime.episodes || '?'} </span>
                            из
                            <span className="all-series"> {anime.episodes_aired || '?'}</span>
                        </span>
                    </li>
                    <li>
                        <span className="info__item">Сезон года:</span>
                        <span className="info__value" style={{color:'#b1b1b1'}}>
                            {anime.aired.prop.from.year || 'Неизвестно'}
                        </span>
                    </li>
                    <li>
                        <span className="info__item">Год:</span>
                        <span className="info__value" style={{color:'#b1b1b1'}}>
                            {anime.prop || 'Неизвестно'}
                        </span>
                    </li>
                    <li>
                        <span className="info__item">Статус:</span>
                        <span className="info__value">
                            <Link to="/">{anime.status || 'Не указано'}</Link>
                        </span>
                    </li>
                    <li>
                        <span className="info__item">Тип:</span>
                        <span className="info__value">
                            <Link to="/">{anime.type || 'Не указано'}</Link>
                        </span>
                    </li>
                    <li>
                        <span className="info__item">Студия:</span>
                        <span className="info__value">
                            <Link to="/">{getStudios()}</Link>
                        </span>
                    </li>
                    <li>
                        <span className="info__item">Озвучка:</span>
                        <span className="info__value" style={{color:'#b1b1b1'}}>
                                {getSources()}
                        </span>
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default AnimeInfo;