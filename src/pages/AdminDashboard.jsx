import { useEffect, useState } from "react";
import api from "../services/api";


const AdminDashboard = () => {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patients = await api.get("/patients");
        const doctors = await api.get("/doctors");
        const appointments = await api.get("/appointments");

        setStats({
          patients: patients.data.length,
          doctors: doctors.data.length,
          appointments: appointments.data.length
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2>Total Patients</h2>
          <p className="text-3xl">{stats.patients}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2>Total Doctors</h2>
          <p className="text-3xl">{stats.doctors}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2>Total Appointments</h2>
          <p className="text-3xl">{stats.appointments}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;