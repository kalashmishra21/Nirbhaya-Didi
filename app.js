function App() {
    try {
        const [isLoggedIn, setIsLoggedIn] = React.useState(false);
        const [user, setUser] = React.useState(null);

        const handleLogin = (userData) => {
            setUser(userData);
            setIsLoggedIn(true);
        };

        const handleLogout = () => {
            storageUtils.clearUser();
            setUser(null);
            setIsLoggedIn(false);
        };

        React.useEffect(() => {
            const savedUser = storageUtils.getUser();
            if (savedUser) {
                handleLogin(savedUser);
            }
        }, []);

        return (
            <div className="min-h-screen bg-gray-100" data-name="app">
                <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                {isLoggedIn ? (
                    <Dashboard user={user} />
                ) : (
                    <Auth onLogin={handleLogin} />
                )}
            </div>
        );
    } catch (error) {
        console.error('App error:', error);
        reportError(error);
        return null;
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
