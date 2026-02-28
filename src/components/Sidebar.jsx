import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  LogOut,
  Menu,
  LayoutDashboard,
  Users,
  Receipt,
  UserPlus,
  Calendar,
  FileText,
  Settings as SettingsIcon,
  Video
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
     ${
       isActive
         ? "bg-indigo-600 text-white shadow-md"
         : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
     }`;

  return (
    <>
      {/* 🔹 Mobile Hamburger */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={22} />
      </button>

      {/* 🔹 Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 🔹 Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-72 bg-white shadow-lg dark:bg-gray-900  transition-colorsborder-r border-gray-200 flex flex-col z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* 🔹 Header */}
        <div className="px-6 py-6 border-b">
          <h2 className="text-xl font-bold text-indigo-600 tracking-wide">
            CLINIC SYSTEM
          </h2>
        </div>

        {/* 🔹 Navigation */}
        <nav className="flex flex-col gap-2 p-4 flex-grow">

          {/* Dashboard (Role-Based Label) */}
          <NavLink to="/dashboard" className={linkClasses}>
            <LayoutDashboard size={18} />
            {user?.role === "admin" && "Admin Panel"}
            {user?.role === "doctor" && "Doctor Panel"}
            {user?.role === "patient" && "Patient Panel"}
            {user?.role === "staff" && "Reception Panel"}
          </NavLink>

          {/* ADMIN & STAFF */}
          {(user?.role === "admin" || user?.role === "staff") && (
            <>
              <NavLink to="/patients" className={linkClasses}>
                <Users size={18} />
                Patients
              </NavLink>

              <NavLink to="/billing" className={linkClasses}>
                <Receipt size={18} />
                Billing
              </NavLink>
            </>
          )}

          {/* ADMIN ONLY */}
          {user?.role === "admin" && (
            <>
              <NavLink to="/create-doctor" className={linkClasses}>
                <UserPlus size={18} />
                Create Doctor
              </NavLink>

              <NavLink to="/admin/staff" className={linkClasses}>
                <Users size={18} />
                Staff Management
              </NavLink>
            </>
          )}

          {/* DOCTOR */}
          {user?.role === "doctor" && (
            <>
              <NavLink to="/appointments" className={linkClasses}>
                <Calendar size={18} />
                Appointments
              </NavLink>
              <NavLink to="/doctor/video-consultations" className={linkClasses}>
  🎥 Video Consultations
</NavLink>

              <NavLink to="/medical-records" className={linkClasses}>
                <FileText size={18} />
                Medical Records
              </NavLink>
            </>
          )}

          {/* PATIENT */}
          
          {user?.role === "patient" && (
  <>
    <NavLink to="/appointments" className={linkClasses}>
      <Calendar size={18} />
      My Appointments
    </NavLink>

    <NavLink to="/video-consultation" className={linkClasses}>
      <Video size={18} />
      Video Consultation
    </NavLink>

    <NavLink to="/medical-records" className={linkClasses}>
      <FileText size={18} />
      Medical Records
    </NavLink>

    <NavLink to="/billing" className={linkClasses}>
      <Receipt size={18} />
      My Bills
    </NavLink>
  </>
)}

          {/* SETTINGS (All Logged-In Users) */}
          {user && (
            <NavLink to="/settings" className={linkClasses}>
              <SettingsIcon size={18} />
              Settings
            </NavLink>
          )}
        </nav>

        {/* 🔹 Logout Section */}
        <div className="p-4 border-t">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl shadow-md hover:opacity-90 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;