import '../../styles/main-anime/anime-series.css'

const AnimeSeries = ({ episodes, currentEpisode, onEpisodeSelect,  onNextEpisode, episodeNumber}) => {

    if (!episodes || episodes.length === 0) {
        return (
            <div >
                <p>Список серий недоступен</p>
            </div>
        );
    }


    return (
        <div className="anime-series-container">
            <div className="anime-series-now-episodes">
                    <button onClick={onNextEpisode}>
                        Следующая серия
                    </button>

                {currentEpisode?.episode_id && (
                    <p>
                        Серия {currentEpisode.episode_id}
                        {currentEpisode.aired && ` • ${new Date(currentEpisode.aired).toLocaleDateString()}`}
                    </p>
                )}
            </div>
            <div className="anime-series-all-episodes">
                {episodes.map((episode, index) => {
                    return (
                        <div style={{alignItems: 'center'}}
                            key={episode.mal_id || index}
                            onClick={() => onEpisodeSelect(episode)}
                        >
                            <div>
                                <button>
                                    {episode.id || `${episode.episode_id || index + 1} серия`}
                                </button>
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AnimeSeries;