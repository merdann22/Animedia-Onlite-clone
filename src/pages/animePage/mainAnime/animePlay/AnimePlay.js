// animePlay/AnimePlay.js
const AnimePlay = ({ videoUrl, currentEpisode, anime, episodes}) => {
    return (
        <div  style={{ position: 'relative', width: '100%', height: '100%'}}>
                <h2 style={{position: "absolute", top: '15px', left: '15px'}}>
                    {anime.title}, {episodes.id} серия </h2>
            {/* Видео плеер (встраиваем YouTube если это YouTube ссылка) */}
            {videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
                <iframe
                    width="100%"
                    height="600"
                    src={videoUrl.replace('watch?v=', 'embed/')}
                    title={currentEpisode?.title || 'Anime video'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                        aspectRatio: '16/10',
                        width: '100%'
                    }}
                />
            ) : (
                <video
                    controls
                    style={{
                        width: '100%',
                        aspectRatio: '16/10',
                        backgroundColor: '#000'
                    }}
                >
                    <source src={videoUrl} type="video/mp4" />
                    Ваш браузер не поддерживает видео тег.
                </video>
            )}
        </div>
    );
};

export default AnimePlay;