import { useEffect, useState } from "react";
import api from "../services/api";

const ReceptionistDashboard = () => {
  const [stats, setStats] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { data } = await api.get("/receptionist/dashboard");
    setStats(data);
  };

  const registerPatient = async () => {
    await api.post("/receptionist/register-patient", {
      name,
      email
    });

    alert("Patient registered");
    setName("");
    setEmail("");
    fetchStats();
  };

  return (
    <div className="p-8 space-y-8 ">

      <h1 className="text-3xl font-bold">Receptionist Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 text-sm">Total Patients</p>
          <p className="text-3xl font-bold">{stats.totalPatients||0}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 text-sm">Today's Patients</p>
          <p className="text-3xl font-bold">{stats.todayPatients||0}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 text-sm">Male</p>
          <p className="text-3xl font-bold">{stats.male||0}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 text-sm">Female</p>
          <p className="text-3xl font-bold">{stats.female||0}</p>
        </div>
      

      <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 text-sm">Today's Appointments</p>
          <p className="text-3xl font-bold">{stats.todayAppointments||0}</p>
        </div>
      

      <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 text-sm">Pending Bill</p>
          <p className="text-3xl font-bold">{stats.pendingBills||0}</p>
        </div>
        </div>
      

      

      {/* REGISTER PATIENT */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Register Patient</h2>

        <input
          placeholder="Patient Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-3"
        />

        <input
          placeholder="Patient Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mr-3"
        />

        <button
          onClick={registerPatient}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Register
        </button>
      </div>
      

    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-linear-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg">
    <p>{title}</p>
    <h2 className="text-2xl font-bold mt-2">{value}</h2>
  </div>
);

export default ReceptionistDashboard;