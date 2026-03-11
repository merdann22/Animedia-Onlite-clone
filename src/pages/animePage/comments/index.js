import React, { useState, useEffect } from 'react';
import '../styles/comments/commentsSections.css'
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import {checkAuthStatus} from "../../Auth/authUtils";

const CommentsAnime = ({ animeId }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userLogin, setUserLogin] = useState('');
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const JIKAN_API_URL = `https://api.jikan.moe/v4/anime/${animeId}/reviews`;

    useEffect(() => {
        const authStatus = checkAuthStatus();
        setIsLoggedIn(authStatus.isLoggedIn);
        setUserLogin(authStatus.userLogin);

        const fetchReviews = async () => {
            try {
                setLoading(true);
                setError(null);

                await new Promise(resolve => setTimeout(resolve, 1000));

                const response = await fetch(JIKAN_API_URL);

                if (!response.ok) {
                    throw new Error('Ошибка загрузки рецензий');
                }

                const data = await response.json();

                if (data.data && data.data.length > 0) {
                    const formattedReviews = data.data.slice(0, 6).map(review => ({
                        id: review.mal_id,
                        message: review.review || 'Рецензия без текста',
                        owner: {
                            firstName: review.user?.username || 'Аноним',
                            lastName: '',
                            picture: review.user?.images?.jpg?.image_url || `https://i.pravatar.cc/40?u=${review.user?.username || 'anon'}`
                        },
                        publishDate: review.date || new Date().toISOString(),
                        likes: review.votes || 0,
                        scores: review.scores || null,
                        isSpoiler: review.is_spoiler || false,
                        isPreliminary: review.is_preliminary || false,
                        episodesWatched: review.episodes_watched || 0
                    }));

                    setReviews(formattedReviews);
                } else {
                    setReviews([]);
                }
            } catch (err) {
                console.error('Ошибка загрузки рецензий:', err);
                setError('Не удалось загрузить рецензии');
                setReviews([]);
            } finally {
                setLoading(false);
            }
        };

        if (animeId) {
            fetchReviews();
        }
    }, [animeId]);

    const handleNewReview = (newReview) => {
        setReviews(prev => [newReview, ...prev]);
    };

    return (
        <section className="comments-section">
            <h3 style={{marginBottom: '20px',textTransform: 'uppercase', color:'var(--tt)'}}>Комментировать аниме:</h3>
            {!isLoggedIn && (
            <div className="no-comment">
                <div>
                </div>
                <div>
                    <p>Информация</p>
                    <p>Посетители, находящиеся в группе Гости, не могут оставлять комментарии к данной публикации.</p>
                </div>
            </div>
            )}
            {isLoggedIn && (
                <CommentForm onSubmit={handleNewReview}/>
            )}
            <CommentList
                reviews={reviews}
                loading={loading}
                error={error}
            />

        </section>
    );
};

export default CommentsAnime;