function SOSButton() {
    try {
        const [isExpanded, setIsExpanded] = React.useState(false);

        const getPriorityContacts = () => {
            const contacts = localStorage.getItem('emergency_contacts');
            if (contacts) {
                return JSON.parse(contacts).filter(contact => contact.isPriority);
            }
            return [];
        };

        const handleEmergencyCall = (number) => {
            try {
                // Use tel: protocol for direct phone calls
                const phoneNumber = number.replace(/\D/g, ''); // Remove non-digit characters
                window.location.href = `tel:${phoneNumber}`;
            } catch (error) {
                console.error('Emergency call error:', error);
                alert(`Unable to initiate emergency call. Please dial ${number} manually.`);
            }
        };

        return (
            <div className="fixed bottom-8 right-8 flex flex-col-reverse items-end space-y-reverse space-y-2">
                {isExpanded && (
                    <div className="bg-white p-4 rounded-lg shadow-lg mb-2" data-name="sos-contacts">
                        <h4 className="font-semibold mb-2">Priority Contacts</h4>
                        {getPriorityContacts().map(contact => (
                            <button
                                key={contact.id}
                                onClick={() => handleEmergencyCall(contact.number)}
                                className="w-full text-left p-2 hover:bg-gray-100 rounded flex items-center justify-between"
                                data-name={`priority-contact-${contact.id}`}
                            >
                                <span>{contact.name}</span>
                                <i className="fas fa-phone text-pink-600"></i>
                            </button>
                        ))}
                    </div>
                )}
                <button
                    onClick={() => handleEmergencyCall('911')}
                    onContextMenu={(e) => {
                        e.preventDefault(); // Prevent right-click menu
                        setIsExpanded(!isExpanded);
                    }}
                    className="sos-button w-20 h-20 bg-red-600 rounded-full text-white font-bold shadow-lg flex items-center justify-center text-xl z-50"
                    data-name="sos-button"
                >
                    <div className="flex flex-col items-center">
                        <i className="fas fa-phone-alt mb-1"></i>
                        <span className="text-sm">SOS</span>
                    </div>
                </button>
            </div>
        );
    } catch (error) {
        console.error('SOSButton error:', error);
        reportError(error);
        return null;
    }
}
