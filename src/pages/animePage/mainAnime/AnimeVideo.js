// AnimeVideo.js
import AnimePlay from "./animePlay/AnimePlay";
import { useState, useEffect } from "react";
import { getAnimeVideos, getAnimeEpisodes, getAnimeExternalLinks } from "../../../jikanClient";

const AnimeVideo = ({ anime }) => {
    const [videos, setVideos] = useState({ promo: [], episodes: [] });
    const [episodes, setEpisodes] = useState([]);
    const [streamingLinks, setStreamingLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentEpisode, setCurrentEpisode] = useState(null);

    useEffect(() => {
        const fetchAnimeVideoData = async () => {
            if (!anime?.mal_id) return;

            setLoading(true);
            setError(null);

            try {
                const [videosData, episodesData, externalLinksData] = await Promise.all([
                    getAnimeVideos(anime.mal_id),
                    getAnimeEpisodes(anime.mal_id, 1),
                    getAnimeExternalLinks(anime.mal_id)
                ]);

                setVideos(videosData);
                setEpisodes(episodesData.data || []);
                setStreamingLinks(externalLinksData);

                if (episodesData.data && episodesData.data.length > 0) {
                    setCurrentEpisode(episodesData.data[0]);
                }

            } catch (err) {
                console.error('Error loading video data:', err);
                setError('Не удалось загрузить видео данные');
            } finally {
                setLoading(false);
            }
        };

        fetchAnimeVideoData();
    }, [anime?.mal_id]);

    const getVideoSource = () => {
        if (!currentEpisode) return null;

        const promoVideo = videos.promo?.find(p =>
            p.title?.includes(`Episode ${currentEpisode.episode_id}`) ||
            p.title?.includes(currentEpisode.title)
        );

        if (promoVideo?.trailer?.youtube_id) {
            return `https://www.youtube.com/watch?v=${promoVideo.trailer.youtube_id}`;
        }

        if (videos.promo && videos.promo.length > 0) {
            return `https://www.youtube.com/watch?v=${videos.promo[0].trailer?.youtube_id}`;
        }

        return null;
    };

    if (loading) return <div>Загрузка видео...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <div>
            <h2>Смотреть онлайн аниме «{anime.title}»</h2>

            {streamingLinks.length > 0 && (
                <div>
                    {streamingLinks
                        .filter(link => link.type === 'streaming')
                        .map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {link.name || 'Смотреть'}
                            </a>
                        ))
                    }
                </div>
            )}

            <AnimePlay
                anime={anime}
                videoUrl={getVideoSource()}
                currentEpisode={currentEpisode}
                episodes={episodes}
                onEpisodeChange={setCurrentEpisode}
            />
        </div>
    );
};

export default AnimeVideo;