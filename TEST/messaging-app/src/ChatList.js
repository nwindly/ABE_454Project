const chats = [
    { id: 1, name: "Class ### - Professor", color: "bg-red-300" },
    { id: 2, name: "Class ### - TA", color: "bg-purple-300" },
    { id: 3, name: "Academic Advisor", color: "bg-green-300" },
    { id: 4, name: "Financial Advisor", color: "bg-yellow-300" },
    { id: 5, name: "School Announcements", color: "bg-blue-300" },
  ];
  
  const ChatList = ({ setActiveChat }) => {
    return (
      <div className="w-80 bg-white p-4 shadow-md">
        <input type="text" placeholder="Search for Chat" className="w-full p-2 mb-4 border rounded" />
        <div className="space-y-4">
          {chats.map(chat => (
            <div key={chat.id} onClick={() => setActiveChat(chat.name)} className="flex items-center p-3 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer">
              <div className={`${chat.color} h-10 w-10 rounded-full`} />
              <div className="ml-3">
                <p className="font-semibold">{chat.name}</p>
                <p className="text-sm text-gray-500">Insert Message</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ChatList;
  