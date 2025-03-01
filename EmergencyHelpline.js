function EmergencyHelpline() {
    try {
        const [contacts, setContacts] = React.useState(() => {
            const savedContacts = localStorage.getItem('emergency_contacts');
            return savedContacts ? JSON.parse(savedContacts) : [
                { id: 'default', name: 'Emergency', number: '911', isPriority: true }
            ];
        });
        const [newContact, setNewContact] = React.useState({ name: '', number: '' });
        const [showForm, setShowForm] = React.useState(false);

        const handleCall = (number) => {
            try {
                // Use tel: protocol for direct phone calls
                const phoneNumber = number.replace(/\D/g, ''); // Remove non-digit characters
                window.location.href = `tel:${phoneNumber}`;
            } catch (error) {
                console.error('Emergency call error:', error);
                alert(`Unable to initiate call. Please dial ${number} manually.`);
            }
        };

        const handleAddContact = (e) => {
            e.preventDefault();
            const updatedContacts = [
                ...contacts,
                {
                    id: Date.now().toString(),
                    ...newContact,
                    isPriority: false
                }
            ];
            setContacts(updatedContacts);
            localStorage.setItem('emergency_contacts', JSON.stringify(updatedContacts));
            setNewContact({ name: '', number: '' });
            setShowForm(false);
        };

        const togglePriority = (id) => {
            const updatedContacts = contacts.map(contact => 
                contact.id === id ? {...contact, isPriority: !contact.isPriority} : contact
            );
            setContacts(updatedContacts);
            localStorage.setItem('emergency_contacts', JSON.stringify(updatedContacts));
        };

        const deleteContact = (id) => {
            const updatedContacts = contacts.filter(contact => contact.id !== id);
            setContacts(updatedContacts);
            localStorage.setItem('emergency_contacts', JSON.stringify(updatedContacts));
        };

        const validatePhoneNumber = (number) => {
            // Remove any non-digit characters
            return number.replace(/\D/g, '');
        };

        return (
            <div className="bg-white p-6 rounded-lg shadow-md mb-4" data-name="emergency-helpline">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Emergency Contacts</h3>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
                        data-name="add-contact-button"
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Add Contact
                    </button>
                </div>

                {showForm && (
                    <form onSubmit={handleAddContact} className="mb-4 p-4 bg-gray-50 rounded" data-name="contact-form">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Contact Name"
                                value={newContact.name}
                                onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                                className="p-2 border rounded"
                                required
                            />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                value={newContact.number}
                                onChange={(e) => setNewContact({
                                    ...newContact,
                                    number: validatePhoneNumber(e.target.value)
                                })}
                                pattern="[0-9]*"
                                className="p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
                            >
                                Save Contact
                            </button>
                        </div>
                    </form>
                )}

                <div className="space-y-3" data-name="contacts-list">
                    {contacts.map((contact) => (
                        <div
                            key={contact.id}
                            className="flex items-center justify-between p-3 border rounded hover:bg-gray-50"
                            data-name={`contact-${contact.id}`}
                        >
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => togglePriority(contact.id)}
                                    className={`text-xl ${contact.isPriority ? 'text-yellow-500' : 'text-gray-400'}`}
                                    title={contact.isPriority ? "Priority Contact" : "Set as Priority"}
                                >
                                    <i className="fas fa-star"></i>
                                </button>
                                <div>
                                    <div className="font-semibold">{contact.name}</div>
                                    <div className="text-sm text-gray-600">{contact.number}</div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <a
                                    href={`tel:${validatePhoneNumber(contact.number)}`}
                                    className="p-2 text-green-600 hover:text-green-700"
                                    title="Call"
                                    data-name={`call-${contact.id}`}
                                >
                                    <i className="fas fa-phone"></i>
                                </a>
                                {contact.id !== 'default' && (
                                    <button
                                        onClick={() => deleteContact(contact.id)}
                                        className="p-2 text-red-600 hover:text-red-700"
                                        title="Delete"
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('EmergencyHelpline error:', error);
        reportError(error);
        return null;
    }
}
