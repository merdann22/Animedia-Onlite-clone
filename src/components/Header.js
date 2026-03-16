import "../assets/styles/header.css"
import logo from "../assets/icons/logod.svg";
import AuthButton from "./AuthButton";
import { NavLink } from "react-router-dom";
import SearchBar from "../pages/searchPage/SearchBar"; // Импортируем новый компонент

export default function Header() {
    return (
        <header>


            <nav className="header__nav" >
                <ul className="header__nav-list flex-grow-1" style={{display: 'flex'}}>
                    <li>
                        <NavLink style={{}} to="/" className={({isActive}) =>
                            isActive ? "nav-link active" : "nav-link"}>
                            <img src={logo} width={170} style={{marginTop: 5}} alt="logo"/>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" className={({isActive}) =>
                            isActive ? "nav-link active" : "nav-link"}>
                            ЖАНР
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/story" className={({isActive}) =>
                            isActive ? "nav-link active" : "nav-link"}>
                            ТИП
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/" className={({isActive}) =>
                            isActive ? "nav-link active": "nav-link"}>
                            СТАТУС
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/" className={({isActive}) =>
                            isActive ? "nav-link active": "nav-link"}>
                            РАССПИСАНИЕ
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/" className={({isActive}) =>
                            isActive ? "nav-link active": "nav-link"}>
                            ТОП 100
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/" className={({isActive}) =>
                            isActive ? "nav-link active": "nav-link"}>
                            ЗАКЛАДКИ
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div style={{display: "flex", justifyContent: "space-between", gap: '5px'}}>
                {/* Используем компонент SearchBar */}
                <SearchBar />

                <button className="dark-white-mode">+</button>

                <div className="notice">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
                    </svg>
                </div>

                <div className="header__actions">
                    <AuthButton/>
                </div>
            </div>
        </header>
    );
};