function LocationTracker() {
    try {
        const [location, setLocation] = React.useState({ latitude: null, longitude: null });
        const [error, setError] = React.useState(null);

        React.useEffect(() => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLocation({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        });
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                        setError('Unable to retrieve location');
                    }
                );
            } else {
                setError('Geolocation is not supported by your browser');
            }
        }, []);

        return (
            <div className="location-info p-4 rounded-lg shadow-md mb-4" data-name="location-tracker">
                <h3 className="text-lg font-semibold mb-2">Your Location</h3>
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div>
                        <p>Latitude: {location.latitude || 'Loading...'}</p>
                        <p>Longitude: {location.longitude || 'Loading...'}</p>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('LocationTracker error:', error);
        reportError(error);
        return null;
    }
}
