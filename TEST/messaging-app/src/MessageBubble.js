const MessageBubble = ({ text, sender }) => {
    const isMe = sender === "me";
    return (
      <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
        <div className={`p-3 max-w-xs rounded-lg text-white ${isMe ? "bg-blue-500" : "bg-gray-300 text-black"}`}>
          {text}
        </div>
      </div>
    );
  };
  
  export default MessageBubble;
  