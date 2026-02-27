import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="fixed left-0 top-0 w-72 bg-white shadow-lg p-8 border-r border-gray-200 flex flex-col h-full">

      <h2 className="text-xl font-bold mb-6">CLINIC SYSTEM</h2>

      <nav className="flex flex-col gap-3">

        {/* Dashboard (All roles) */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "bg-indigo-500 px-3 py-2 rounded-lg"
              : "px-3 py-2 rounded-lg hover:bg-indigo-100"
          }
        >
          Dashboard
        </NavLink>

        {/* ================= ADMIN & STAFF ================= */}
        {(user?.role === "admin" || user?.role === "staff") && (
          <>
            <NavLink
              to="/patients"
              className={({ isActive }) =>
                isActive
                  ? "bg-indigo-500 text-white px-3 py-2 rounded-lg"
                  : "px-3 py-2 rounded-lg hover:bg-indigo-100"
              }
            >
              Patients
            </NavLink>

            <NavLink
              to="/billing"
              className={({ isActive }) =>
                isActive
                  ? "bg-indigo-500 text-white px-3 py-2 rounded-lg"
                  : "px-3 py-2 rounded-lg hover:bg-indigo-100"
              }
            >
              Billing
            </NavLink>
          </>
        )}

        {/* ================= ADMIN ONLY ================= */}
        {user?.role === "admin" && (
          <NavLink
            to="/create-doctor"
            className={({ isActive }) =>
              isActive
                ? "bg-indigo-500 text-white px-3 py-2 rounded-lg"
                : "px-3 py-2 rounded-lg hover:bg-indigo-100"
            }
          >
            Create Doctor
          </NavLink>
        )}
       

{user?.role === "admin" && (
  <>
    
    
    <NavLink
    to="/admin/staff"
    className={({ isActive }) =>
      isActive
        ? "bg-indigo-500 text-white px-3 py-2 rounded-lg"
        : "px-3 py-2 rounded-lg hover:bg-indigo-100"
    }
  >
    Staff
  </NavLink>
  </>
)}



        {/* ================= DOCTOR ================= */}
        {user?.role === "doctor" && (
          <>
            <NavLink
              to="/appointments"
              className={({ isActive }) =>
                isActive
                  ? "bg-indigo-500 text-white px-3 py-2 rounded-lg"
                  : "px-3 py-2 rounded-lg hover:bg-indigo-100"
              }
            >
              Appointments
            </NavLink>

            <NavLink
              to="/medical-records"
              className={({ isActive }) =>
                isActive
                  ? "bg-indigo-500 text-white px-3 py-2 rounded-lg"
                  : "px-3 py-2 rounded-lg hover:bg-indigo-100"
              }
            >
              Medical Records
            </NavLink>
          </>
        )}

        {/* ================= PATIENT ================= */}
        {user?.role === "patient" && (
          <>
            <NavLink
              to="/appointments"
              className={({ isActive }) =>
                isActive
                  ? "bg-indigo-500 text-white px-3 py-2 rounded-lg"
                  : "px-3 py-2 rounded-lg hover:bg-indigo-100"
              }
            >
              My Appointments
            </NavLink>

            <NavLink
              to="/medical-records"
              className={({ isActive }) =>
                isActive
                  ? "bg-indigo-500 text-white px-3 py-2 rounded-lg"
                  : "px-3 py-2 rounded-lg hover:bg-indigo-100"
              }
            >
              Medical Records
            </NavLink>

            <NavLink
              to="/billing"
              className={({ isActive }) =>
                isActive
                  ? "bg-indigo-500 text-white px-3 py-2 rounded-lg"
                  : "px-3 py-2 rounded-lg hover:bg-indigo-100"
              }
            >
              My Bills
            </NavLink>
          </>
        )}

      </nav>

      {/* Logout Button */}
      <div className="mt-auto">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl shadow-md"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;