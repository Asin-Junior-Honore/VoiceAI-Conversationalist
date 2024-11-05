import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaRobot } from 'react-icons/fa';
import { Link } from 'react-router-dom';

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

function VoiceRecorder() {
    const [isListening, setIsListening] = useState(false);
    const [transcription, setTranscription] = useState('');
    const [chatHistory, setChatHistory] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // New state for voice settings
    const [voiceSettings, setVoiceSettings] = useState({
        pitch: 1,
        rate: 1,
    });

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    useEffect(() => {
        if (!recognition) {
            console.warn("Speech Recognition API is not supported in this browser.");
            return;
        }

        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: { resultIndex: any; results: string | any[]; }) => {
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                interimTranscript += transcript;
            }
            setTranscription(interimTranscript);
        };

        recognition.onerror = (event: { error: any; }) => {
            console.error("Speech Recognition Error:", event.error);
        };
    }, [recognition]);

    const toggleListening = () => {
        if (isListening) {
            recognition?.stop();
            setIsListening(false);
        } else {
            recognition?.start();
            setIsListening(true);
        }
    };


    const handleSend = async () => {
        if (transcription.trim()) {
            setChatHistory((prev) => [...prev, `You: ${transcription}`]);
            setIsLoading(true);
            setIsListening(false);

            const token = localStorage.getItem('token');

            try {
                const response = await fetch('https://voice-ai-conversationalist.vercel.app/api/conversations/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ userMessage: transcription }),
                });

                if (!response.ok) throw new Error("Failed to fetch AI response");

                const data = await response.json();
                const aiResponse = data.aiResponse || "No response available at this time.";

                setChatHistory((prev) => [...prev, `AI: ${aiResponse}`]);
                generateAIResponse(aiResponse);
            } catch (error) {
                console.error("Error:", error);
                setChatHistory((prev) => [...prev, "AI: Sorry, something went wrong. Please try again."]);
            } finally {
                setIsLoading(false);
                setTranscription('');
            }
        }
    };




    const generateAIResponse = (message: string) => {
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = 'en-US';
        utterance.pitch = voiceSettings.pitch; // Use user-defined pitch
        utterance.rate = voiceSettings.rate;   // Use user-defined rate
        utterance.volume = 1;

        window.speechSynthesis.speak(utterance); // Trigger the voice response
    };

    // Handlers for voice settings
    const handlePitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVoiceSettings(prev => ({ ...prev, pitch: parseFloat(event.target.value) }));
    };

    const handleRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVoiceSettings(prev => ({ ...prev, rate: parseFloat(event.target.value) }));
    };

    return (
        <div className="container">
            <aside style={{ textAlign: 'start' }}>
                <button onClick={toggleListening}>
                    {isListening ? "Stop Listening" : "Start Listening"}
                </button>

                <div className="transcription">
                    <p>{transcription || "Your speech will appear here..."}</p>
                </div>

                <button onClick={handleSend}>Send</button>

                {/* Voice settings controls */}
                <div className="voice-settings" style={{ marginTop: '20px' }}>
                    <label>
                        Pitch:
                        <input
                            type="range"
                            min="0"
                            max="2"
                            step="0.1"
                            value={voiceSettings.pitch}
                            onChange={handlePitchChange}
                        />
                    </label>
                    <label>
                        Rate:
                        <input
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.1"
                            value={voiceSettings.rate}
                            onChange={handleRateChange}
                        />
                    </label>
                </div>

            </aside>
            <aside>
                <div className="chat-container">
                    {chatHistory.length === 0 ? (
                        <h2 className="empty-message">Chat will display here...</h2>
                    ) : (
                        chatHistory.map((message, index) => (
                            <div key={index} className={`message ${message.startsWith('You') ? 'user' : 'ai'}`}>
                                {message.startsWith('You') ? (
                                    <div>
                                        <FaUserCircle style={{ marginRight: '8px' }} />
                                        {message}
                                    </div>
                                ) : (
                                    <div>
                                        <FaRobot style={{ marginRight: '8px' }} />
                                        {message}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                    {isLoading && <p className="loading">Loading...</p>}
                </div>

                <Link to={'conversations'}>
                    <div className='chat-container' style={{ marginTop: '28px' }}>
                        <button>View your conversations</button>
                    </div>
                </Link>
            </aside>

        </div>
    );
}

export default VoiceRecorder;
