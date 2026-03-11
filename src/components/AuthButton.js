// AuthButton.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/Auth/style/authButton.css';
import avaLogin from "../assets/images/avatarka.png";
import profile from "../assets/images/logo192.png";
import LoginForm from "../pages/Auth/Login/LoginForm";
import { checkAuthStatus, logout } from '../pages/Auth/authUtils';

const AuthButton = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [userLogin, setUserLogin] = useState('');

    useEffect(() => {
        const authStatus = checkAuthStatus();
        setIsLoggedIn(authStatus.isLoggedIn);
        setUserLogin(authStatus.userLogin);
    }, []);

    const handleButtonClick = () => {
        setShowMenu(!showMenu);
    };

    const handleProfileClick = () => {
        navigate('/profile');
        setShowMenu(false);
    };

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
        setUserLogin('');
        setShowMenu(false);
        window.location.reload();
    };

    const handleLoginSuccess = () => {
        setShowMenu(false);
        const authStatus = checkAuthStatus();
        setIsLoggedIn(authStatus.isLoggedIn);
        setUserLogin(authStatus.userLogin);
    };

    return (
        <div className="auth-button">
            <button
                className="auth-button__btn"
                onClick={handleButtonClick}
            >
                <img
                    src={avaLogin}
                    className="auth-button__avatar"
                    alt="avatar"
                />
            </button>

            {isLoggedIn && showMenu && (
                <div>
                    <div className="auth-button__menu">
                        <div className="auth-button__menu-header">
                            <img src={avaLogin} className="auth-button__avatar" alt="avatar" />
                            <span>{userLogin}</span>
                            <button className="auth-button__closelogin" onClick={handleButtonClick}>x</button>
                        </div>
                        <div className="auth-button__menu-items">
                            <button className="auth-button__menu-item" onClick={handleProfileClick}>
                                <img src={profile} className="auth-button__avatar" alt="avatar"/>
                                Мой профиль
                            </button>
                            <button className="auth-button__menu-item" onClick={handleButtonClick}>
                                <img src={profile} className="auth-button__avatar" alt="avatar"/>
                                Сообщения:
                            </button>
                            <button className="auth-button__menu-item" onClick={handleButtonClick}>
                                <img src={profile} className="auth-button__avatar" alt="avatar"/>
                                Закладки
                            </button>
                            <button className="auth-button__menu-item" onClick={handleButtonClick}>
                                <img src={profile} className="auth-button__avatar" alt="avatar"/>
                                Мои списки
                            </button>
                            <button className="auth-button__menu-item" onClick={handleButtonClick}>
                                <img src={profile} className="auth-button__avatar" alt="avatar"/>
                                Комментарии
                            </button>
                            <button className="auth-button__menu-item" onClick={handleLogout}>
                                <img src={profile} className="auth-button__avatar" alt="avatar"/>
                                выйти
                            </button>
                        </div>
                    </div>
                    <div className="auth-button__menu-overlay"></div>
                </div>
            )}
            {!isLoggedIn && showMenu && (
                <div>
                    <div className="auth-button__menu">
                        <LoginForm
                            onSuccess={handleLoginSuccess}
                            onClose={() => setShowMenu(false)}
                        />
                    </div>
                    <div className="auth-button__menu-overlay"></div>
                </div>

            )}
        </div>
    );
};

export default AuthButton;