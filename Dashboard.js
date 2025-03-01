function Dashboard({ user }) {
    try {
        const [profileImage, setProfileImage] = React.useState('https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100');

        const handleImageChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setProfileImage(reader.result);
                };
                reader.readAsDataURL(file);
            }
        };

        return (
            <div className="dashboard-container min-h-screen p-4" data-name="dashboard">
                <div className="max-w-6xl mx-auto">
                    <div className="profile-section p-6 rounded-lg shadow-xl mb-6">
                        <div className="text-center mb-6">
                            <div className="relative inline-block">
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full object-cover mb-4"
                                />
                                <label className="absolute bottom-0 right-0 bg-pink-600 text-white p-2 rounded-full cursor-pointer">
                                    <i className="fas fa-camera"></i>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>
                            <h2 className="text-2xl font-bold">Welcome, {user.name}!</h2>
                        </div>
                    </div>
                    
                    <HelpSection />
                    <LocationMap />
                    <EmergencyHelpline />
                </div>
                <SOSButton />
            </div>
        );
    } catch (error) {
        console.error('Dashboard error:', error);
        reportError(error);
        return null;
    }
}
