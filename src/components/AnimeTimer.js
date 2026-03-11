import '../assets/styles/animeTimer.css'

import { useState, useEffect } from 'react';

const useWeeklyTimer = (broadcast) => {
    const [time, setTime] = useState({});

    useEffect(() => {
        if (!broadcast?.day || !broadcast?.time) return;

        const daysMap = {sundays:0,mondays:1,tuesdays:2,wednesdays:3,thursdays:4,fridays:5,saturdays:6};

        const update = () => {
            const now = new Date();
            const targetDay = daysMap[broadcast.day.toLowerCase()];
            const [h, m] = broadcast.time.split(':').map(Number);

            const next = new Date();
            let addDays = (targetDay + 7 - now.getDay()) % 7;
            if (addDays === 0 && now.getHours() >= h) addDays = 7;

            next.setDate(now.getDate() + addDays);
            next.setHours(h, m, 0, 0);

            const diff = next - now;
            if (diff > 0) {
                setTime({
                    d: Math.floor(diff / 86400000),
                    h: Math.floor((diff % 86400000) / 3600000),
                    m: Math.floor((diff % 3600000) / 60000),
                    s: Math.floor((diff % 60000) / 1000),
                    total: diff
                });
            }
        };

        update();
        const timer = setInterval(update, 1000);
        return () => clearInterval(timer);
    }, [broadcast]);

    return time;
};

const AnimeTimer = ({ anime }) => {
    const { d, h, m, s, total } = useWeeklyTimer(anime?.broadcast);

    if (!anime || anime.status !== "Currently Airing" || !anime.broadcast?.day) return null;

    if (d === 0 && h < 24) {
        return (
            <div className={`anime-timer ${d === 0 ? 'today' : ''}`}>
                <span className="timer-badge">{d === 0 ? 'Сегодня' : 'Через:'}</span>
                <span className="timer-time">
                    {d === 0 ? `в ${anime.broadcast.time}` :
                        `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`}
                </span>
            </div>
        );
    }

    return (
        <div className="anime-timer">
            <div className="timer-time">
                <span>
                    {d}
                </span>
                <span>
                    день
                </span>
            </div>

            <div style={{marginBottom: '15px', fontSize: '42px'}}>:</div>

            <div className="timer-time">
                <span>
                    {String(h).padStart(2, '0')}
                </span>
                <span>
                    час
                </span>
            </div>

            <div style={{marginBottom: '15px',fontSize: '42px'}}>:</div>

            <div className="timer-time">
                <span>
                    {String(m).padStart(2, '0')}
                </span>
                <span>
                    минута
                </span>
            </div>

            <div style={{marginBottom: '15px', fontSize: '42px'}}>:</div>

            <div className="timer-time">
                <span>
                    {String(s).padStart(2, '0')}
                </span>
                <span>
                    секунда
                </span>
            </div>
        </div>
    );
};

export default AnimeTimer;