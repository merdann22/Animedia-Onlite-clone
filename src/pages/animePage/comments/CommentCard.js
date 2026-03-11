// commentCard.jsx - ФИКСИРОВАННЫЙ КОМПОНЕНТ
import '../styles/comments/commentCard.css';

// Компонент с заглавной буквы
const CommentCard = ({
                         review,
                         isExpanded,
                         onToggleExpand,
                         formatDate,
                         averageScore
                     }) => {
    // Вычисляем значения внутри компонента
    const shouldTruncate = review.message?.length > 300;
    const displayMessage = isExpanded || !shouldTruncate
        ? review.message
        : review.message?.substring(0, 300) + '...';

    return (
        <div className="comment-item-wrapper">
            <div className={`comment-header ${review.isSpoiler ? 'spoiler' : ''}`}>
                <img
                    src={review.owner?.picture || `https://i.pravatar.cc/40?u=anon`}
                    alt={`${review.owner?.firstName || 'Аноним'} ${review.owner?.lastName || ''}`}
                    onError={(e) => {
                        e.target.src = `https://i.pravatar.cc/40?u=${review.owner?.firstName || 'anon'}`;
                    }}
                />
            </div>

            <div className={`comment-item ${review.isSpoiler ? 'spoiler' : ''}`}>
                <div>
                    <div className="comment-user-info">
                        <strong className="comment-user-name">
                            {review.owner?.firstName || 'Аноним'} {review.owner?.lastName || ''}
                        </strong>
                        {averageScore >= 0 && (
                            <span className="average-score">
                                ★ {averageScore}
                            </span>
                        )}
                    </div>
                </div>
                <div className="comment-content">
                    {displayMessage}
                    {shouldTruncate && (
                        <button
                            className="expand-btn"
                            onClick={onToggleExpand}
                        >
                            {isExpanded ? 'Свернуть' : 'ещё'}
                        </button>
                    )}
                </div>

                <div className="comment-footer">
                    <span className="comment-date">
                        {formatDate(review.publishDate)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CommentCard;