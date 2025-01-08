import { NextResponse } from 'next/server';
import OpenAI from 'openai'; // Correct import for the OpenAI library

// Initialize OpenAI API client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is set as an environment variable
});

export async function POST(req: Request) {
    try {
        // Parse the request body
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json(
                { error: 'Prompt is required.' },
                { status: 400 }
            );
        }

        // Query the OpenAI API
        const openAiResponse = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // Specify the desired model
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 150, // Limit response length
        });

        const responseText =
            openAiResponse.choices[0]?.message?.content?.trim();

        // Return the AI-generated response
        return NextResponse.json(
            { response: responseText },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error querying OpenAI:', error.message);

        // Handle specific API errors if needed
        if (error.response) {
            return NextResponse.json(
                { error: error.response.data.error.message },
                { status: error.response.status }
            );
        }

        return NextResponse.json(
            { error: 'Failed to process the request.' },
            { status: 500 }
        );
    }
}
