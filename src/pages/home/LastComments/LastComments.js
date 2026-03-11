import React, { useState, useEffect } from 'react';
import CommentCard from '../../animePage/comments/CommentCard';
import Pagination from './Pagination';
import { fetchAllComments } from './commentsService';
import '../../animePage/styles/comments/lastComments.css';

const LastComments = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);
    const [expandedReviews, setExpandedReviews] = useState({});
    const [allLoadedComments, setAllLoadedComments] = useState([]);
    const COMMENTS_PER_PAGE = 6;

    useEffect(() => {
        const loadComments = async () => {
            try {
                setLoading(true);
                setError(null);

                const fetchedComments = await fetchAllComments();
                setAllLoadedComments(fetchedComments);
                setComments(fetchedComments.slice(0, COMMENTS_PER_PAGE));
            } catch (err) {
                console.error('Ошибка загрузки рецензий:', err);
                setError('Не удалось загрузить рецензии');
            } finally {
                setLoading(false);
            }
        };

        loadComments();
    }, []);

    const changePage = (newPage) => {
        if (page === newPage || newPage < 1) return;

        const totalPages = Math.ceil(allLoadedComments.length / COMMENTS_PER_PAGE);
        if (newPage > totalPages) return;

        setPage(newPage);
        const startIndex = (newPage - 1) * COMMENTS_PER_PAGE;
        const endIndex = startIndex + COMMENTS_PER_PAGE;
        setComments(allLoadedComments.slice(startIndex, endIndex));
    };

    const toggleExpand = (reviewId) => {
        setExpandedReviews(prev => ({
            ...prev,
            [reviewId]: !prev[reviewId]
        }));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

        if (diffInHours < 24) {
            return `${diffInHours} ч. назад`;
        } else if (diffInHours < 168) {
            return `${Math.floor(diffInHours / 24)} дн. назад`;
        } else {
            return date.toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
        }
    };

    if (loading && allLoadedComments.length === 0) {
        return (
            <div className="last-comments-loading">
                <div className="loading-spinner"></div>
                Загрузка последних рецензий...
            </div>
        );
    }

    if (error && allLoadedComments.length === 0) {
        return (
            <div className="last-comments-error">
                {error}
            </div>
        );
    }

    const totalPagesCount = Math.ceil(allLoadedComments.length / COMMENTS_PER_PAGE);

    return (
        <div className="last-comments">

            <div className="last-comments-header">
                <h2>ПОСЛЕДНИЕ РЕЦЕНЗИИ</h2>
            </div>

            <div className="last-comments-list">
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <CommentCard
                            key={`${comment.id}-${index}`}
                            review={comment}
                            isExpanded={expandedReviews[comment.id] || false}
                            onToggleExpand={() => toggleExpand(comment.id)}
                            formatDate={formatDate}
                            likes={comment.likes || 0}
                            isLiked={false}
                            onLikeClick={() => {}}
                            averageScore={comment.scores?.overall || 0}
                        />
                    ))
                ) : (
                    <div className="no-last-comments">
                        Пока нет рецензий
                    </div>
                )}
            </div>

            <Pagination
                currentPage={page}
                totalPages={totalPagesCount}
                onPageChange={changePage}
            />
        </div>
    );
};

export default LastComments;