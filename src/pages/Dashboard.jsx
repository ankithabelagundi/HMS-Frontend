import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


import DoctorDashboard from "./DoctorDashboard";
import AdminDashboard from "./AdminDashboard";
import PatientDashboard from "./PatientDashboard";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  if (user.role === "doctor") {
    return <DoctorDashboard />;
  }

  if (user.role === "admin") {
    return <AdminDashboard />;
  }

  if (user.role === "patient") {
    return <PatientDashboard />;
  }

  return <div className="bg-linear-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-2xl shadow-lg">No role assigned</div>;
};

export default Dashboard;