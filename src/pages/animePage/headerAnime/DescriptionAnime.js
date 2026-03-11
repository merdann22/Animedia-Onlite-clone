
const DescriptionAnime = ({ anime }) => {// Что приходит?

    if (!anime) {
        return <div className="about-sait">Загрузка описания...</div>;
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--tt)'}}>
            <h3>Описание сюжета «{anime.title}»</h3>
            <div className="about-sait">
                <p>{anime.synopsis || 'Описание отсутствует'}</p>
            </div>
        </div>
    );
};
export default DescriptionAnime;