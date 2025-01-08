import { supabase } from '../../../../../supabaseClient';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { conversation_id, parent_id, content } = await req.json();

        const { data, error } = await supabase
            .from('messages')
            .insert({ conversation_id, parent_id, content });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}
