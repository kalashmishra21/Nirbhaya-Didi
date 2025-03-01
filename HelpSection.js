function HelpSection() {
    try {
        const [activeTab, setActiveTab] = React.useState('helpline');

        const helplineInfo = [
            { name: "Women's Helpline (All India)", number: "1091" },
            { name: "Women's Helpline (Domestic Abuse)", number: "181" },
            { name: "Police", number: "100" },
            { name: "National Emergency Number", number: "112" }
        ];

        const safetyTips = [
            {
                title: "Stay Alert",
                tips: [
                    "Be aware of your surroundings at all times",
                    "Walk confidently and with purpose",
                    "Avoid isolated areas, especially at night",
                    "Trust your instincts - if something feels wrong, leave"
                ]
            },
            {
                title: "Digital Safety",
                tips: [
                    "Keep your location sharing on with trusted contacts",
                    "Save emergency numbers on speed dial",
                    "Keep your phone charged at all times",
                    "Install safety apps and know how to use them"
                ]
            },
            {
                title: "Self-Defense",
                tips: [
                    "Learn basic self-defense moves",
                    "Carry personal safety devices (whistle, pepper spray)",
                    "Take self-defense classes if possible",
                    "Stay fit and maintain physical strength"
                ]
            }
        ];

        const handleCall = (number) => {
            try {
                const phoneNumber = number.replace(/\D/g, '');
                window.location.href = `tel:${phoneNumber}`;
            } catch (error) {
                console.error('Call error:', error);
                alert(`Unable to initiate call. Please dial ${number} manually.`);
            }
        };

        return (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6" data-name="help-section">
                <div className="flex mb-6 border-b">
                    <button
                        onClick={() => setActiveTab('helpline')}
                        className={`px-4 py-2 ${activeTab === 'helpline' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-600'}`}
                    >
                        24/7 Helpline
                    </button>
                    <button
                        onClick={() => setActiveTab('safety')}
                        className={`px-4 py-2 ${activeTab === 'safety' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-600'}`}
                    >
                        Safety Tips
                    </button>
                </div>

                {activeTab === 'helpline' && (
                    <div className="grid gap-4" data-name="helpline-section">
                        {helplineInfo.map((helpline, index) => (
                            <div
                                key={index}
                                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-semibold">{helpline.name}</h3>
                                        <p className="text-lg text-pink-600">{helpline.number}</p>
                                    </div>
                                    <a
                                        href={`tel:${helpline.number}`}
                                        className="p-2 text-green-600 hover:text-green-700"
                                        data-name={`helpline-${index}`}
                                    >
                                        <i className="fas fa-phone"></i>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'safety' && (
                    <div className="space-y-6" data-name="safety-tips-section">
                        {safetyTips.map((category, index) => (
                            <div key={index} className="border-b pb-4 last:border-b-0">
                                <h3 className="font-semibold text-lg mb-3">{category.title}</h3>
                                <ul className="space-y-2">
                                    {category.tips.map((tip, tipIndex) => (
                                        <li key={tipIndex} className="flex items-start">
                                            <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                                            <span>{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('HelpSection error:', error);
        reportError(error);
        return null;
    }
}
