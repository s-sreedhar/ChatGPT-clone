import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

interface Message {
    id: string;
    content: string;
    parent_id: string | null;
    version: number;
}

const Chat = ({ conversationId }: { conversationId: string }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .eq('conversation_id', conversationId);

        if (error) console.error(error);
        else setMessages(data);
    };

    const sendMessage = async () => {
        if (!input) return;
        const { data, error } = await supabase.from('messages').insert({
            conversation_id: conversationId,
            content: input,
        });

        if (error) console.error(error);
        else {
            setMessages((prev) => [...prev, data[0]]);
            setInput('');
        }
    };

    return (
        <div>
            <div>
                {messages.map((msg) => (
                    <div key={msg.id}>
                        <p>{msg.content}</p>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
