import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Topbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [notificationCount, setNotificationCount] = useState(0);

  /* =========================
     Get Initial Letter
  ========================== */
  const getInitial = () => {
    if (!user?.name) return "U";
    return user.name.charAt(0).toUpperCase();
  };

  /* =========================
     Doctor Notification Polling
  ========================== */
  useEffect(() => {
    if (!user || user.role !== "doctor") return;

    const fetchNotifications = async () => {
      try {
        const { data } = await api.get("/appointments");

        const newAppointments = data.filter(
          (a) => a.status === "scheduled"
        );

        setNotificationCount(newAppointments.length);
      } catch (err) {
        console.error("Notification error:", err);
      }
    };

    fetchNotifications();

    const interval = setInterval(fetchNotifications, 10000);

    return () => clearInterval(interval);
  }, [user]);

  return (
    <div className="bg-white shadow-sm px-6 md:px-8 py-4 flex justify-between items-center border-b">

      {/* Left Title */}
      <h2 className="text-lg md:text-xl font-semibold">
        Dashboard
      </h2>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* Notification Bell */}
        {user?.role === "doctor" && (
          <div
            onClick={() => navigate("/appointments")}
            className="relative cursor-pointer"
          >
            <Bell size={22} />

            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
                {notificationCount}
              </span>
            )}
          </div>
        )}

        {/* User Avatar */}
        <div
          onClick={() => navigate("/settings")}
          className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold cursor-pointer hover:opacity-90 transition"
        >
          {getInitial()}
        </div>

      </div>
    </div>
  );
};

export default Topbar;