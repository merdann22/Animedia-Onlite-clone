import AnimeSidebar from "./AnimeSidebar";
import AnimeVideo from "./AnimeVideo";
import '../styles/main-anime/index.css'

const AnimePlayVideo = ({anime}) => {
    return <div className="anime-play-video">
        <AnimeSidebar anime={anime} />
        <AnimeVideo anime={anime} />
        </div>
};

export default AnimePlayVideo;