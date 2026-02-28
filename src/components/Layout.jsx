import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 md:ml-72 flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors">

        {/* Topbar */}
        <Topbar />

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-6 py-6">
          {children}
        </main>

      </div>
    </div>
  );
};

export default Layout;