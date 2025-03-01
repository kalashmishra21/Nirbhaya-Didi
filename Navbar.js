function Navbar({ isLoggedIn, onLogout }) {
    try {
        return (
            <nav className="bg-white shadow-lg" data-name="navbar">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <i className="fas fa-shield-alt text-pink-600 text-2xl"></i>
                            <span className="font-bold text-xl text-gray-800">Nirbhaya Be Fearless</span>
                        </div>
                        {isLoggedIn && (
                            <button
                                onClick={onLogout}
                                className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition-colors"
                                data-name="logout-button"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        );
    } catch (error) {
        console.error('Navbar error:', error);
        reportError(error);
        return null;
    }
}
