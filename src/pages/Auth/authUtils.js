// authUtils.js
export const checkAuthStatus = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.token) {
        const userKey = `user_${currentUser.login}`;
        const userData = JSON.parse(localStorage.getItem(userKey));

        if (userData && userData.token === currentUser.token) {
            return {
                isLoggedIn: true,
                userLogin: currentUser.login
            };
        } else {
            localStorage.removeItem('currentUser');
            return {
                isLoggedIn: false,
                userLogin: ''
            };
        }
    } else {
        return {
            isLoggedIn: false,
            userLogin: ''
        };
    }
};

export const logout = () => {
    localStorage.removeItem('currentUser');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('currentUser'));
};

export const isAuthenticated = () => {
    return checkAuthStatus().isLoggedIn;
};