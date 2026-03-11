import { useState } from 'react';
import './style/register.css';
import {useNavigate} from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        login: '',
        password: '',
        confirmPassword: '',
        email: '',
        interests: ''
    });

    const [errors, setErrors] = useState({});

    // Функция для получения всех зарегистрированных пользователей
    const getAllUsers = () => {
        const users = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('user_')) {
                const userData = JSON.parse(localStorage.getItem(key));
                users.push(userData);
            }
        }
        return users;
    };

    // Проверка уникальности логина и email
    const validateUnique = (login, email) => {
        // Получаем всех зарегистрированных пользователей из localStorage
        const users = getAllUsers();
        const errors = {};

        // Проверяем, есть ли пользователь с таким же логином
        if (users.some(user => user.login.toLowerCase() === login.toLowerCase())) {
            errors.login = 'Этот логин уже занят';
        }

        // Проверяем, есть ли пользователь с таким же email
        if (users.some(user => user.email.toLowerCase() === email.toLowerCase())) {
            errors.email = 'Этот email уже зарегистрирован';
        }

        // getAllUsers() - получает список всех пользователей
        // users.some() - проверяет, есть ли ХОТЯ БЫ ОДИН пользователь с таким логином/email
        // .toLowerCase() - делает проверку нечувствительной к регистру (User = user = USER)

        return errors;
    };

    const handleChange = (e) => {
        // Получаем имя поля и его значение из события
        const { name, value } = e.target;

        // Обновляем состояние формы
        setFormData(prev => ({ ...prev, [name]: value }));

        // Если в этом поле была ошибка - очищаем её
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }

        //e.target - элемент, который вызвал событие (input/select)
        // name - название поля ("login", "email" и т.д.)
        // value - то, что пользователь ввел
        // ...prev - копируем все предыдущие значения формы
        // [name]: value - обновляем только одно поле
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Отменяем стандартную отправку формы

        // ПРОВЕРКА 1: Совпадают ли пароли
        if (formData.password !== formData.confirmPassword) {
            setErrors({ confirmPassword: 'Пароли не совпадают!' });
            return; // Останавливаем выполнение
        }

        // ПРОВЕРКА 2: Уникальны ли логин и email
        const uniquenessErrors = validateUnique(formData.login, formData.email);
        if (Object.keys(uniquenessErrors).length > 0) {
            setErrors(uniquenessErrors);
            return; // Останавливаем выполнение
        }

        const generateToken = () => {
            return Math.random().toString(36).substring(2) + Date.now().toString(36);
        };

        const userData = {
            ...formData,
            registrationDate: new Date().toISOString(),
            token: generateToken() // ← ДОБАВЛЯЕМ ТОКЕН
        };

        // Сохраняем пользователя
        localStorage.setItem(`user_${formData.login}`, JSON.stringify(userData));

        // Сразу авторизуем пользователя после регистрации
        localStorage.setItem('currentUser', JSON.stringify({
            login: userData.login,
            email: userData.email,
            token: userData.token,
            isLoggedIn: true
        }));
        navigate('/profile');
        alert('Регистрация успешна!');


        // Перенаправляем в профиль
    };

    return (
        <form onSubmit={handleSubmit} className="register-form">
            <h2>Регистрация</h2>

            <div className="reg-group">
                <label htmlFor="login">Логин:</label>
                <div>
                    <input
                        type="text"
                        id="login"
                        name="login"
                        value={formData.login}
                        onChange={handleChange}
                        required
                        placeholder="Введите ваш логин"
                    />
                    {errors.login && <span className="error">{errors.login}</span>}
                </div>

            </div>

            <div className="reg-group">
                <label htmlFor="password">Пароль:</label>
                <div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Введите пароль"
                    />
                </div>

            </div>

            <div className="reg-group">
                <label htmlFor="confirmPassword">Повторите пароль:</label>
                <div>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder="Повторите пароль"
                    />
                    {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                </div>

            </div>

            <div className="reg-group">
                <label htmlFor="email">Ваш E-Mail:</label>
                <div>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="example@mail.com"
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

            </div>

            <div className="reg-group">
                <label htmlFor="interests">Что смотрят на данном сайте?</label>
                <select
                    id="interests"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    required
                >
                    <option value="">Выберите интерес</option>
                    <option value="series">Сериалы</option>
                    <option value="cartoons">Мультфильмы</option>
                    <option value="anime">Аниме</option>
                    <option value="other">Другое</option>
                </select>
            </div>
            <button type="submit" className="submit-btn">
                Зарегистрироваться
            </button>
        </form>
    )
};

export default Register;