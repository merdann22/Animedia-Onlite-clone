import {Link} from "react-router-dom";
import '../assets/styles/footer.css';
import logo from '../assets/images/logo192.png';

export default function Footer() {
    return <footer>
                <div>
                    <div>
                        <Link to="/">Аниме 2025 года</Link>
                        <Link to="/">Онгоинги</Link>
                        <Link to="/">Вопросы или проблемы по сайту</Link>
                        <Link to="/">Для правообладателей</Link>
                    </div>
                    <div>
                        © 2025 AniMedia.Online admin@amedia.online
                    </div>
                </div>
                <div>
                    <div>
                        AniMedia.Online - Все аниме онлайн в одном месте (18+).
                    </div>
                    <div>
                        <img src={logo} alt="logo"/>
                        <div style={{width:'30px', height: '20px', backgroundColor: 'white'}} ></div>
                    </div>
                </div>
    </footer>
}