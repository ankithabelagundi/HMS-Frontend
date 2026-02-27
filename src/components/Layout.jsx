import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <Sidebar />

      <main className="flex-1 ml-72 p-8">
        <div className="bg-white rounded-2xl shadow-md p-8 min-h-[calc(100vh-4rem)]">
          {children}
        </div>
      </main>

    </div>
  );
};

export default Layout;