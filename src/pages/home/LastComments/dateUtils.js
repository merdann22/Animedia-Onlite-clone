// Утилиты для форматирования дат
export const formatDate = (dateString) => {
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
            month: 'short',
            year: 'numeric'
        });
    }
};

export const formatDateFull = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} дн. назад`;
    if (hours > 0) return `${hours} ч. назад`;
    if (minutes > 0) return `${minutes} мин. назад`;
    return 'Только что';
};
export default formatDate();