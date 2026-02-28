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
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="space-y-8">
      

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
        Admin Control Panel
      </h1>

      {/* =========================
          METRICS GRID
      ========================== */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

        <MetricCard title="Total Revenue" value={`₹${stats.totalRevenue || 0}`} />
        <MetricCard title="Total Doctors" value={stats.totalDoctors || 0} />
        <MetricCard title="Total Patients" value={stats.totalPatients || 0} />
        <MetricCard title="Total Appointments" value={stats.totalAppointments || 0} />
        <MetricCard title="Completed Appointments" value={stats.completedAppointments || 0} />
        <MetricCard title="Pending Appointments" value={stats.pendingAppointments || 0} />
        <MetricCard
  title="Total Video Consultations"
  value={stats.totalVideoConsultations || 0}
/>

      </div>

      {/* =========================
          REVENUE GRAPH
      ========================== */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-6">
          Monthly Revenue Analysis
        </h2>

        <div className="w-full h-64">
          <Bar data={revenueChartData} />
        </div>
      </div>

      {/* =========================
          DOCTOR PERFORMANCE
      ========================== */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-6 dark:text-white">
          Doctor Performance
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="p-3 text-left">Doctor</th>
                <th className="p-3 text-left">Total Appointments</th>
                <th className="p-3 text-left">Completed</th>
                <th className="p-3 text-left">Completion %</th>
              </tr>
            </thead>

            <tbody>
              {doctorPerformance.map((doc, index) => {
                const percent =
                  doc.total > 0
                    ? ((doc.completed / doc.total) * 100).toFixed(1)
                    : 0;

                return (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{doc.name}</td>
                    <td className="p-3">{doc.total}</td>
                    <td className="p-3">{doc.completed}</td>
                    <td className="p-3 font-medium">{percent}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};


/* =========================
   METRIC CARD
========================= */
const MetricCard = ({ title, value }) => (
  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
    <p className="text-sm opacity-80">{title}</p>
    <h2 className="text-2xl font-semibold mt-2">{value}</h2>
  </div>
);

export default AdminDashboard;