const storageUtils = {
    saveUser: (userData) => {
        try {
            localStorage.setItem('nirbhaya_user', JSON.stringify(userData));
            return true;
        } catch (error) {
            console.error('Error saving user data:', error);
            return false;
        }
    },

    getUser: () => {
        try {
            const userData = localStorage.getItem('nirbhaya_user');
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error('Error getting user data:', error);
            return null;
        }
    },

    clearUser: () => {
        try {
            localStorage.removeItem('nirbhaya_user');
            return true;
        } catch (error) {
            console.error('Error clearing user data:', error);
            return false;
        }
    },

    checkExistingUser: (email) => {
        try {
            const users = JSON.parse(localStorage.getItem('nirbhaya_users') || '[]');
            return users.find(user => user.email === email);
        } catch (error) {
            console.error('Error checking existing user:', error);
            return null;
        }
    },

    saveNewUser: (userData) => {
        try {
            const users = JSON.parse(localStorage.getItem('nirbhaya_users') || '[]');
            users.push(userData);
            localStorage.setItem('nirbhaya_users', JSON.stringify(users));
            return true;
        } catch (error) {
            console.error('Error saving new user:', error);
            return false;
        }
    }
};
