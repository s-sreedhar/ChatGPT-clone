import '../styles/globals.css';

export const metadata = {
    title: 'ChatGPT Clone',
    description: 'A ChatGPT clone with message branching and versioning.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <header>
                    <h1>ChatGPT Clone</h1>
                </header>
                <main>{children}</main>
            </body>
        </html>
    );
}
