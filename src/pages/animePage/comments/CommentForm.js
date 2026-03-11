import React, { useState } from 'react';
import LoginForm from '../../Auth/Login/LoginForm';
import { checkAuthStatus } from '../../Auth/authUtils';
import '../styles/comments/commentForm.css'

const CommentForm = ({ onSubmit }) => {
    const [newComment, setNewComment] = useState('');
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    // Проверяем авторизацию
    React.useEffect(() => {
        const checkAuth = () => {
            const authStatus = checkAuthStatus();
            setIsLoggedIn(authStatus.isLoggedIn);
            if (authStatus.isLoggedIn) {
                const user = JSON.parse(localStorage.getItem('currentUser'));
                setCurrentUser(user);
            }
        };
        checkAuth();
    }, []);

    const handleSubmitComment = () => {
        if (!newComment.trim()) return;

        if (isLoggedIn) {
            // Если авторизован - создаем рецензию
            const tempReview = {
                id: Date.now(),
                message: newComment,
                owner: {
                    firstName: currentUser?.login || 'Вы',
                    lastName: '',
                    picture: currentUser?.avatar || 'https://i.pravatar.cc/40?u=you'
                },
                publishDate: new Date().toISOString(),
                likes: 0,
                scores: {
                    overall: 0,
                    story: 0,
                    animation: 0,
                    sound: 0,
                    character: 0,
                    enjoyment: 0
                },
                isSpoiler: false,
                isPreliminary: false,
                episodesWatched: 0
            };

            onSubmit(tempReview);
            setNewComment('');
        } else {
            // Если не авторизован - открываем форму логина
            setShowLoginForm(true);
        }
    };

    const handleLoginSuccess = () => {
        setShowLoginForm(false);
        const authStatus = checkAuthStatus();
        setIsLoggedIn(authStatus.isLoggedIn);
        if (authStatus.isLoggedIn) {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            setCurrentUser(user);
        }
    };

    return (
        <div className="comment-form">
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Напишите вашу рецензию на это аниме..."
                className="comment-textarea"
                rows="4"
            />
            <button
                onClick={handleSubmitComment}
                className="comment-submit-btn"
            >
                Отправить
            </button>

            {showLoginForm && (
                <div className="auth-button__menu">
                    <LoginForm
                        onSuccess={handleLoginSuccess}
                        onClose={() => setShowLoginForm(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default CommentForm;