import "../styles/header-anime/scoreCard.css"

const ScoreCard = ({anime, customTitle}) => {
    if (!anime) return "Нет оценок";



    return (
        <div className="score-card">
            <div>
                {anime.score.toFixed(0)}
            </div>
            <div>
                <p>
                    {customTitle}
                </p>
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>

        </div>
    );
};

export default ScoreCard;