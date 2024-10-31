import React, { useEffect, useState } from 'react';

interface Conversation {
    userMessage: string;
    aiResponse: string;
    timestamp: string;
}

const Conversations: React.FC = () => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchConversations = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch('http://localhost:5000/api/conversations', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch conversations');
                }

                const data = await response.json();
                // console.log(data)
                setConversations(data);
            } catch (error) {
                console.error("Error fetching conversations:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchConversations();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="conversations-section">
            <h1>Your Conversations</h1>
            {conversations.length === 0 ? (
                <p className="empty-message">No conversations found.</p>
            ) : (
                <div className="chat-container">
                    {conversations.map((conversation, index) => (
                        <div key={index} className="message-container">
                            <div className="message user">
                                <strong>You:</strong> {conversation.userMessage}
                            </div>
                            <div className="message ai">
                                <strong>AI:</strong> {conversation.aiResponse}
                            </div>
                            <small className="timestamp">{new Date(conversation.timestamp).toLocaleString()}</small>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Conversations;
