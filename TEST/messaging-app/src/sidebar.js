import { HomeIcon, FolderIcon, ChatBubbleLeftIcon, CogIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-100 h-screen p-4 shadow-md">
      <h2 className="text-lg font-bold mb-6">Logo | Website Name</h2>
      <nav className="space-y-4">
        <SidebarItem icon={HomeIcon} label="Home" />
        <SidebarItem icon={FolderIcon} label="My Files" />
        <SidebarItem icon={ChatBubbleLeftIcon} label="Messages" active />
        <SidebarItem icon={CogIcon} label="Settings" />
        <SidebarItem icon={ArrowLeftOnRectangleIcon} label="Log Out" />
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, active }) => (
  <div className={`flex items-center p-2 rounded-lg cursor-pointer ${active ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}>
    <Icon className="h-6 w-6 mr-2" />
    <span>{label}</span>
  </div>
);

export default Sidebar;
