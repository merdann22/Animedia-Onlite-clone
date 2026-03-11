import { useState } from 'react';
import '../style/login.css';
import logo from "../../../assets/images/logo192.png";
import { Link, useNavigate} from 'react-router-dom';

const LoginForm = ({ onSuccess, onClose }) => { // ← принимаем пропсы
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Ищем пользователя
        const userKey = `user_${login}`;
        const userData = JSON.parse(localStorage.getItem(userKey));

        if (!userData) {
            setError('Пользователь не найден');
            return;
        }

        if (userData.password !== password) {
            setError('Неверный пароль');
            return;
        }

        // Создаем новый токен
        const generateToken = () => {
            return Math.random().toString(36).substring(2) + Date.now().toString(36);
        };

        const newToken = generateToken();

        // Обновляем данные пользователя
        const updatedUserData = {
            ...userData,
            token: newToken
        };
        localStorage.setItem(userKey, JSON.stringify(updatedUserData));

        // Сохраняем сессию
        localStorage.setItem('currentUser', JSON.stringify({
            login: userData.login,
            email: userData.email,
            token: newToken,
            isLoggedIn: true
        }));

        // ВЫЗЫВАЕМ ФУНКЦИИ ИЗ АВТHBUTTON
        if (onSuccess) {
            onSuccess(); // ← обновляем состояние в AuthButton
        }


        if (onClose) {
            onClose();

            const overlay = document.querySelector('.overlay');
            if (overlay) {
                overlay.style.display = 'none';
            }// ← закрываем меню
        }
    };
    const handleToLogin = (e) => {
        return window.location.reload();
    }

    return (
        <div>
            <div className="auth-button__menu-header">
                <div>
                    Войти
                    <Link to="/registration" onClick={onClose}>
                        Регистрация
                    </Link>
                </div>

                <button className="auth-button__closelogin" onClick={onClose}>x</button>

            </div>
            <form onSubmit={handleLogin} className="post-form">
                <div>
                    <div className="form-group">
                        <label>Логин:</label>
                        <input
                            type="text"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            placeholder="Ваш логин"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <div>
                            <label>Пароль:</label>
                            <Link to="/">Забыли пароль?</Link>
                        </div>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ваш пароль"
                            required
                        />
                    </div>

                    {error && <div className="error">{error}</div>}
                </div>


                <button type="submit" onClick={handleToLogin} className="submit-btn">
                    Войти на сайт
                </button>
            </form>
            <div className="auth-button__menu-footer">
                <span>или войти через</span>
                <div>
                    <img width={30} src={logo} alt="logo"/>
                    <img width={30} src={logo} alt=""/>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;