import { supabase } from '../../../../../supabaseClient';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { message_id, new_content } = await req.json();

        // Mark the old message as inactive
        const { error: updateError } = await supabase
            .from('messages')
            .update({ is_active: false })
            .eq('id', message_id);

        if (updateError) {
            return NextResponse.json({ error: updateError.message }, { status: 500 });
        }

        // Fetch the current version
        const { data: oldMessage, error: fetchError } = await supabase
            .from('messages')
            .select('conversation_id, version')
            .eq('id', message_id)
            .single();

        if (fetchError) {
            return NextResponse.json({ error: fetchError.message }, { status: 500 });
        }

        // Create a new message version
        const { conversation_id, version } = oldMessage;
        const { data, error: insertError } = await supabase.from('messages').insert({
            conversation_id,
            parent_id: message_id,
            content: new_content,
            version: version + 1,
        });

        if (insertError) {
            return NextResponse.json({ error: insertError.message }, { status: 500 });
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}
