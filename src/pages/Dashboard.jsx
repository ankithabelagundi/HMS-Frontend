import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import DoctorDashboard from "./DoctorDashboard";
import AdminDashboard from "./AdminDashboard";
import PatientDashboard from "./PatientDashboard";
import ReceptionistDashboard from "./ReceptionistDashboard";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  if (user.role === "doctor") return <DoctorDashboard />;
  if (user.role === "admin") return <AdminDashboard />;
  if (user.role === "patient") return <PatientDashboard />;
  if (user.role === "staff") return <ReceptionistDashboard />;

  return <div>No role assigned</div>;
};

export default Dashboard;