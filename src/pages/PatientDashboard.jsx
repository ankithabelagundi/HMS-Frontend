import { useEffect, useState } from "react";
import api from "../services/api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await api.get("/appointments");
        setAppointments(data);

        // Convert appointments into monthly stats
        const monthlyCount = {};

        data.forEach((app) => {
          const month = new Date(app.appointment_date)
            .toLocaleString("en-IN", { month: "short" });

          monthlyCount[month] = (monthlyCount[month] || 0) + 1;
        });

        const formattedData = Object.keys(monthlyCount).map((month) => ({
          month,
          visits: monthlyCount[month]
        }));

        setChartData(formattedData);

      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="p-6">

      {/* ================= HEADER ================= */}
      <h1 className="text-3xl font-bold mb-6">
        Patient Dashboard
      </h1>

      {/* ================= CHART ================= */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">
          My Visits Overview
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="visits"
              stroke="#6366f1"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ================= APPOINTMENT LIST ================= */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          My Appointments
        </h2>

        <ul className="space-y-3">
          {appointments.map((app) => (
            <li
              key={app.id}
              className="p-4 border rounded-lg flex justify-between items-center"
            >
              <span>
                {new Date(app.appointment_date).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </span>

              <span className="capitalize font-medium text-indigo-600">
                {app.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default PatientDashboard;