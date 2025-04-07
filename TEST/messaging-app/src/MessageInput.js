import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

const MessageInput = () => {
  return (
    <div className="p-4 bg-white flex items-center border-t">
      <input type="text" placeholder="Type your message here..." className="flex-1 p-2 border rounded-lg" />
      <button className="ml-2 bg-blue-500 text-white p-2 rounded-lg">
        <PaperAirplaneIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

export default MessageInput;
