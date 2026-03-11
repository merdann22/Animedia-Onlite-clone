import './style/profile.css';
import { Link } from 'react-router-dom';
import userAvatar from '../../assets/images/avatarka.png';

const UserProfile = () => {
    return (
        <div className="profile-page">
            <div className="profile-header">
                <div>
                    <img style={{width: '100px', height:'100px', marginBottom:'10px', borderRadius: '50%', border: 'solid 5px white',}} src={userAvatar} alt="ava"/>
                    <button className="submit-btn">Выбрать аву</button>
                </div>
                <div>
                    <h2>Name</h2>
                    <span style={{fontSize: '13px'}}>Группа: Постоялец</span>
                </div>
                <div>
                    <span style={{fontSize: '14px'}}>отправить e-mail</span>
                    <button className="submit-btn">Написать ПС</button>
                </div>
            </div>
            <div className="profile-content">
                <div>В сети</div>
                <div>
                    <div>Комментариев
                        <div>0</div>
                    </div>
                    <div>Друзей
                        <div>0</div>
                    </div>

                </div>
                <div> <Link to="/">редактировать</Link></div>
            </div>
            <div className="profile-footer">
                <div>
                    <span>Регистрация:</span>
                    <li>25 июня 2025, 23:05</li>
                </div>
                <div>
                    <span>Заходил(а):</span>
                    <li>Только что</li>
                </div>
                <div>
                    <span>Полное имя:</span>
                    <li>メル ダン</li>
                </div>
                <div>
                    <span>О себе:</span>
                    <li>...</li>
                </div>


            </div>
        </div>
    )
}

export default UserProfile;