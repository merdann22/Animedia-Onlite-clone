// animePlay/AnimePlay.js
import { useState } from 'react';
import AnimeSeries from './AnimeSeries';

const AnimePlay = ({ videoUrl, currentEpisode, anime, episodes, onEpisodeChange }) => {
    const [showSeries, setShowSeries] = useState(true);

    if (!videoUrl) {
        return (
            <div>
                <h2>{anime?.title}</h2>
                <button onClick={() => setShowSeries(!showSeries)}>
                    {showSeries ? 'Скрыть серии' : 'Все серии'}
                </button>
                <p>Видео не доступно</p>
                {showSeries && (
                    <AnimeSeries
                        episodes={episodes}
                        currentEpisode={currentEpisode}
                        onEpisodeSelect={(episode) => {
                            onEpisodeChange(episode);
                            setShowSeries(false);
                        }}
                    />
                )}
            </div>
        );
    }

    const episodeNumber = currentEpisode?.episode_id || currentEpisode?.mal_id || '1';

    return (
        <div>
            <h2>{anime?.title}, {episodeNumber} серия</h2>

            <button onClick={() => setShowSeries(!showSeries)}>
                {showSeries ? 'Скрыть серии' : 'Все серии'}
            </button>

            {videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
                <iframe
                    width="100%"
                    height="600"
                    src={videoUrl.replace('watch?v=', 'embed/')}
                    title={currentEpisode?.title || 'Anime video'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    key={videoUrl}
                />
            ) : (
                <video
                    controls
                    key={videoUrl}
                    width="100%"
                    height="600"
                >
                    <source src={videoUrl} type="video/mp4" />
                </video>
            )}

            {showSeries && (
                <div>
                    <h3>Список серий ({episodes.length})</h3>
                    <AnimeSeries
                        episodes={episodes}
                        currentEpisode={currentEpisode}
                        onEpisodeSelect={(episode) => {
                            onEpisodeChange(episode);
                            setShowSeries(false);
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default AnimePlay;