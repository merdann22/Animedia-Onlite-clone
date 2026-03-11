// CommentList.jsx - ИСПОЛЬЗУЕМ CommentCard
import React, { useState } from 'react';
import '../styles/comments/commentCard.css';
import CommentCard from "./CommentCard"; // С заглавной буквы!

const CommentList = ({ reviews, loading, error }) => {
    const [expandedReviews, setExpandedReviews] = useState({});
    const [likesState, setLikesState] = useState({});
    const [likedState, setLikedState] = useState({});

    const handleLike = (reviewId) => {
        const isLiked = likedState[reviewId] || false;
        const currentLikes = likesState[reviewId] || reviews.find(r => r.id === reviewId)?.likes || 0;

        setLikedState(prev => ({
            ...prev,
            [reviewId]: !isLiked
        }));

        setLikesState(prev => ({
            ...prev,
            [reviewId]: isLiked ? currentLikes - 1 : currentLikes + 1
        }));
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
                month: 'short'
            });
        }
    };

    if (loading) {
        return (
            <div className="comments-loading">
                <div className="loading-spinner"></div>
                Загрузка рецензий...
            </div>
        );
    }

    if (error) {
        return (
            <div className="comments-error">
                {error}
            </div>
        );
    }

    if (reviews.length === 0) {
        return (
            <div className="no-reviews">
                Пока нет рецензий
            </div>
        );
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap:'16px'}}>
            {reviews.map(review => (
                <CommentCard
                    key={review.id}
                    review={review}
                    isExpanded={expandedReviews[review.id] || false}
                    onToggleExpand={() => toggleExpand(review.id)}
                    formatDate={formatDate}
                    likes={likesState[review.id] || review.likes || 0}
                    isLiked={likedState[review.id] || false}
                    onLikeClick={() => handleLike(review.id)}
                    averageScore={review.scores?.overall || 0}
                />
            ))}
        </div>
    );
};

export default CommentList;