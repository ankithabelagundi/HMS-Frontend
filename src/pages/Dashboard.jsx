import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import DoctorDashboard from "./DoctorDashboard";
import AdminDashboard from "./AdminDashboard";
import PatientDashboard from "./PatientDashboard";
import ReceptionistDashboard from "./ReceptionistDashboard";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  const renderDashboard = () => {
    switch (user.role) {
      case "doctor":
        return <DoctorDashboard />;
      case "admin":
        return <AdminDashboard />;
      case "patient":
        return <PatientDashboard />;
      case "staff":
        return <ReceptionistDashboard />;
      default:
        return <div>No role assigned</div>;
    }
  };

  return (
    <div className="space-y-8 dark:bg-gray-800 transition-colors">

      {/* Top Header Bar */}
      <div className="bg-white p-6 rounded-2xl dark:bg-gray-900 text-gray-900 dark:text-white transition-color shadow-sm flex justify-between items-center transition-colors">
        <div>
          <h1 className="text-2xl font-bold  text-gray-900 dark:text-white dark:bg-gray-800 transition-color">
            Welcome back 👋
          </h1>
          <p className=" text-sm mt-1 text-gray-900 dark:text-white">
            {user.email}
          </p>
        </div>

        <div className="bg-indigo-600 text-gray-900 dark:text-white  px-4 py-2 rounded-xl text-sm font-medium  dark:bg-gray-800 transition-color">
          {user.role.toUpperCase()}
        </div>
      </div>

      {/* Main Role Dashboard */}
      {renderDashboard()}

    </div>
  );
};

export default Dashboard;