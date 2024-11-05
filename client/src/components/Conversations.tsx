import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
                const response = await fetch('https://voiceai-conversationalist.onrender.com/api/conversatons', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch conversations');
                }

                const data = await response.json();
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
        return <h3>Loading...</h3>;
    }

    return (
        <div className='wrapper'>
            <div className="conversations-section">
                <h1>Your Conversations</h1>
                {conversations.length === 0 ? (
                    <p className="empty-message">No conversations found.</p>
                ) : (
                    <div>
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

                    </div>
                )}
            </div>

            <Link to={'/'}>
                <div className="conversations-section">
                    <button>Back To Home</button>
                </div>
            </Link>
        </div>
    );
};

export default Conversations;
