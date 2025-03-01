function Auth({ onLogin }) {
    try {
        const [isSignUp, setIsSignUp] = React.useState(false);
        const [formData, setFormData] = React.useState({
            email: '',
            password: '',
            name: ''
        });
        const [error, setError] = React.useState('');

        React.useEffect(() => {
            const savedUser = storageUtils.getUser();
            if (savedUser) {
                onLogin(savedUser);
            }
        }, []);

        const handleSubmit = (e) => {
            e.preventDefault();
            setError('');

            if (isSignUp) {
                const existingUser = storageUtils.checkExistingUser(formData.email);
                if (existingUser) {
                    setError('Email already exists');
                    return;
                }

                const newUser = {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                };

                if (storageUtils.saveNewUser(newUser)) {
                    storageUtils.saveUser(newUser);
                    onLogin(newUser);
                } else {
                    setError('Error creating account');
                }
            } else {
                const existingUser = storageUtils.checkExistingUser(formData.email);
                if (!existingUser || existingUser.password !== formData.password) {
                    setError('Invalid email or password');
                    return;
                }

                storageUtils.saveUser(existingUser);
                onLogin(existingUser);
            }
        };

        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        };

        return (
            <div className="auth-container min-h-screen flex items-center justify-center px-4" data-name="auth-form">
                <div className="auth-form w-full max-w-md p-8 rounded-lg shadow-xl">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        {isSignUp ? 'Create Account' : 'Sign In'}
                    </h2>
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded" data-name="auth-error">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        {isSignUp && (
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    className="auth-input w-full px-4 py-2 rounded border"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="mb-4">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="auth-input w-full px-4 py-2 rounded border"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="auth-input w-full px-4 py-2 rounded border"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition-colors"
                        >
                            {isSignUp ? 'Sign Up' : 'Sign In'}
                        </button>
                    </form>
                    <p className="mt-4 text-center">
                        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                        <button
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="ml-2 text-pink-600 hover:text-pink-700"
                        >
                            {isSignUp ? 'Sign In' : 'Sign Up'}
                        </button>
                    </p>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Auth error:', error);
        reportError(error);
        return null;
    }
}
