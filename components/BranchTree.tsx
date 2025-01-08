import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

interface Message {
    id: string;
    content: string;
    parent_id: string | null;
    version: number;
}

const BranchTree = ({ conversationId }: { conversationId: string }) => {
    const [messages, setMessages] = useState<Message[]>([]);

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

    const renderTree = (parentId: string | null): JSX.Element[] => {
        return messages
            .filter((msg) => msg.parent_id === parentId)
            .map((msg) => (
                <li key={msg.id}>
                    <p>
                        {msg.content} (v{msg.version})
                    </p>
                    <ul>{renderTree(msg.id)}</ul>
                </li>
            ));
    };

    return (
        <div>
            <h3>Message Branches</h3>
            <ul>{renderTree(null)}</ul>
        </div>
    );
};

export default BranchTree;
