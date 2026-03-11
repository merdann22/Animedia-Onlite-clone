import ScoreCard from "./ScoreCard";
import "../styles/header-anime/scoreList.css"

const ScoreList = ({anime}) => {

    const customTitles = [
        {
            id: 0,
            title: "Сюжет",
        },
        {
            id: 1,
            title: "Персонажи",
        },
        {
            id: 2,
            title: "Рисовка",
        },
        {
            id: 3,
            title: "Озвучка",
        },
    ];

    return (
        <div className="score-stats">
            <div className="score-list">
                {customTitles.map((item) => (
                    <div key={item.id}>
                        <ScoreCard
                            anime={anime}
                            customTitle={item.title}
                        />
                    </div>
                ))}
                <div className="last-score">
                    <div>{anime.score}</div>
                    ({anime.scored_by})
                </div>
            </div>
        </div>

    )
}
export default ScoreList;