import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
   <div className="flex min-h-screen bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 ">
  <Sidebar />
  <main className="flex-1 ml-72  p-6 md:p-8">
    {children}
  </main>
</div>
  );
};

export default Layout;
