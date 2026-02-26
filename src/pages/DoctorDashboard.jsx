import { useEffect, useState } from "react";
import api from "../services/api";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const { data } = await api.get("/appointments");
      setAppointments(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const total = appointments.length;
  const upcoming = appointments.filter(
    (a) => a.status === "scheduled"
  ).length;
  const completed = appointments.filter(
    (a) => a.status === "completed"
  ).length;

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/appointments/${id}`, { status });
      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Doctor Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow">
          <h2>Total Appointments</h2>
          <p className="text-3xl">{total}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2>Upcoming</h2>
          <p className="text-3xl text-blue-600">{upcoming}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2>Completed</h2>
          <p className="text-3xl text-green-600">{completed}</p>
        </div>
      </div>

      {/* Appointment Table */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">
          My Appointments
        </h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Patient</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((app) => (
              <tr key={app.id}>
                <td className="p-2 border">
                  {app.patients?.users?.name}
                </td>

                <td className="p-2 border">
                  {new Date(app.appointment_date).toLocaleString()}
                </td>

                <td className="p-2 border capitalize">
                  {app.status}
                </td>

                <td className="p-2 border">
                  {app.status === "scheduled" && (
                    <>
                      <button
                        onClick={() =>
                          updateStatus(app.id, "completed")
                        }
                        className="text-green-600 mr-2"
                      >
                        Complete
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(app.id, "cancelled")
                        }
                        className="text-red-600"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorDashboard;