import { useState } from "react";
import Sidebar from "./sidebar";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import MessageInput from "./MessageInput";

function App() {
  const [activeChat, setActiveChat] = useState("Select a chat");

  return (
    <div className="flex h-screen">
      <Sidebar />
      <ChatList setActiveChat={setActiveChat} />
      <div className="flex-1 flex flex-col">
        <ChatWindow activeChat={activeChat} />
        <MessageInput />
      </div>
    </div>
  );
}

export default App;
