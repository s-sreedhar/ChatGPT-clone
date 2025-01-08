import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

interface Version {
    id: string;
    content: string;
    version: number;
    created_at: string;
}

const VersionHistory = ({ messageId }: { messageId: string }) => {
    const [versions, setVersions] = useState<Version[]>([]);

    useEffect(() => {
        fetchVersionHistory();
    }, []);

    const fetchVersionHistory = async () => {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .or(`id.eq.${messageId},parent_id.eq.${messageId}`)
            .order('version', { ascending: true });

        if (error) console.error(error);
        else setVersions(data);
    };

    return (
        <div>
            <h3>Version History</h3>
            <ul>
                {versions.map((version) => (
                    <li key={version.id}>
                        <strong>Version {version.version}:</strong> {version.content} <br />
                        <small>Created at: {new Date(version.created_at).toLocaleString()}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VersionHistory;
