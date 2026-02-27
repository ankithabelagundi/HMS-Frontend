import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [doctorPerformance, setDoctorPerformance] = useState([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const { data: statsData } = await api.get("/dashboard/admin");
      const { data: revenueData } = await api.get("/dashboard/revenue-monthly");
      const { data: doctorData } = await api.get(
        "/dashboard/doctor-performance"
      );

      setStats(statsData);
      setMonthlyRevenue(revenueData);
      setDoctorPerformance(doctorData);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

 const revenueChartData = {
  labels: [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ],
  datasets: [
    {
      label: "Monthly Revenue",
      data: monthlyRevenue || Array(12).fill(0),
      backgroundColor: "#4f46e5",
    },
  ],
};
  return (
    <div className="p-8 space-y-10 ">

      <h1 className="text-3xl font-bold text-gray-800">
        Admin Control Panel
      </h1>

      {/* =========================
          TOP METRICS
      ========================== */}
      <div className="grid grid-cols-3 gap-6">

        <MetricCard title="Total Revenue" value={`₹${stats.totalRevenue || 0}`} />
        <MetricCard title="Total Doctors" value={stats.totalDoctors || 0} />
        <MetricCard title="Total Patients" value={stats.totalPatients || 0} />
        <MetricCard title="Total Appointments" value={stats.totalAppointments || 0} />
        <MetricCard title="Completed Appointments" value={stats.completedAppointments || 0} />
        <MetricCard title="Pending Appointments" value={stats.pendingAppointments || 0} />

      </div>

      {/* =========================
          REVENUE GRAPH
      ========================== */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          Monthly Revenue Analysis
        </h2>

        <Bar data={revenueChartData} />
      </div>

      {/* =========================
          DOCTOR PERFORMANCE
      ========================== */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          Doctor Performance
        </h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Doctor</th>
              <th className="p-3 border">Total Appointments</th>
              <th className="p-3 border">Completed</th>
              <th className="p-3 border">Completion %</th>
            </tr>
          </thead>

          <tbody>
            {doctorPerformance.map((doc, index) => {
              const percent =
                doc.total > 0
                  ? ((doc.completed / doc.total) * 100).toFixed(1)
                  : 0;

              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3 border">{doc.name}</td>
                  <td className="p-3 border">{doc.total}</td>
                  <td className="p-3 border">{doc.completed}</td>
                  <td className="p-3 border">{percent}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};

/* =========================
   METRIC CARD COMPONENT
========================= */
const MetricCard = ({ title, value }) => (
  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
    <p className="text-sm opacity-80">{title}</p>
    <h2 className="text-2xl font-bold mt-2">{value}</h2>
  </div>
);

export default AdminDashboard;