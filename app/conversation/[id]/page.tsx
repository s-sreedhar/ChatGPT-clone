'use client';

import React, { useState } from 'react';
import { use } from 'react';

const ConversationPage = ({ params }: { params: Promise<{ id: string }> }) => {
    // Unwrap the `params` Promise
    const unwrappedParams = use(params);

    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendPrompt = async () => {
        if (!prompt) return;

        setLoading(true);

        try {
            const res = await fetch(`/conversation/${unwrappedParams.id}/api/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            const data = await res.json();

            if (res.ok) {
                setResponse(data.response);
            } else {
                console.error(data.error);
                setResponse('An error occurred.');
            }
        } catch (error) {
            console.error('Error sending prompt:', error);
            setResponse('An error occurred.');
        }

        setLoading(false);
    };

    return (
        <div>
            <h1>Conversation</h1>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt..."
                rows={4}
                style={{ width: '100%', marginBottom: '10px' }}
            />
            <button
                onClick={handleSendPrompt}
                disabled={loading}
                style={{ padding: '10px 20px', marginBottom: '20px' }}
            >
                {loading ? 'Processing...' : 'Send'}
            </button>
            <div>
                <h3>AI Response:</h3>
                <p>{response || 'No response yet.'}</p>
            </div>
        </div>
    );
};

export default ConversationPage;
