import Chat from '../../../components/Chat';
import BranchTree from '../../../components/BranchTree';
import VersionHistory from '../../../components/VersionHistory';

export default function ConversationPage({ params }: { params: { id: string } }) {
    return (
        <div>
            <h2>Conversation</h2>
            <Chat conversationId={params.id} />
            <BranchTree conversationId={params.id} />
            <VersionHistory messageId="example-message-id" />
        </div>
    );
}
