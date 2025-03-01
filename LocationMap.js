function LocationMap() {
    try {
        const [map, setMap] = React.useState(null);
        const [marker, setMarker] = React.useState(null);
        const mapRef = React.useRef(null);
        const [location, setLocation] = React.useState(null);
        const [error, setError] = React.useState(null);

        React.useEffect(() => {
            if (mapRef.current && !map) {
                const initialMap = new google.maps.Map(mapRef.current, {
                    zoom: 15,
                    center: { lat: 20.5937, lng: 78.9629 }, // Default to India's center
                    mapTypeControl: true,
                    streetViewControl: false
                });
                setMap(initialMap);
            }
        }, [map]);

        const handleGetLocation = async () => {
            try {
                const position = await getCurrentLocation();
                setLocation(position);
                
                if (map) {
                    const latLng = { 
                        lat: position.latitude, 
                        lng: position.longitude 
                    };
                    
                    map.setCenter(latLng);
                    
                    if (marker) {
                        marker.setMap(null);
                    }
                    
                    const newMarker = new google.maps.Marker({
                        position: latLng,
                        map: map,
                        title: 'Your Location'
                    });
                    
                    setMarker(newMarker);
                }
            } catch (err) {
                console.error('Error getting location:', err);
                setError('Unable to retrieve your location');
            }
        };

        return (
            <div className="bg-white p-4 rounded-lg shadow-md mb-4" data-name="location-map">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Location Tracker</h3>
                    <button
                        onClick={handleGetLocation}
                        className="location-button px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
                        data-name="get-location-button"
                    >
                        <i className="fas fa-location-dot mr-2"></i>
                        Get My Location
                    </button>
                </div>
                {error && (
                    <div className="text-red-500 mb-4" data-name="location-error">
                        {error}
                    </div>
                )}
                <div 
                    ref={mapRef} 
                    className="map-container"
                    data-name="map-container"
                ></div>
                {location && (
                    <div className="mt-4 text-sm text-gray-600" data-name="location-details">
                        <p>Latitude: {location.latitude}</p>
                        <p>Longitude: {location.longitude}</p>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('LocationMap error:', error);
        reportError(error);
        return null;
    }
}
