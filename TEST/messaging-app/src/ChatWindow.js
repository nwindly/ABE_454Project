import MessageBubble from "./MessageBubble";

const ChatWindow = ({ activeChat }) => {
  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <div className="p-4 border-b bg-white flex justify-between items-center">
        <h2 className="text-lg font-semibold">{activeChat}</h2>
      </div>
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <MessageBubble text="Hello! How can I help?" sender="them" />
        <MessageBubble text="I have a question about the assignment." sender="me" />
        <MessageBubble text="Sure, what do you need help with?" sender="them" />
      </div>
    </div>
  );
};

export default ChatWindow;
