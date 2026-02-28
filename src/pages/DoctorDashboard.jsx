import { useEffect, useState } from "react";
import api from "../services/api";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [videoConsultations, setVideoConsultations] = useState([]);

  const fetchAppointments = async () => {
    try {
      const { data } = await api.get("/appointments");
      setAppointments(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
  const fetchVideoConsultations = async () => {
    try {
      const { data } = await api.get("/dashboard/doctor/video-consultations");
      setAppointments(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  fetchVideoConsultations();
}, []);

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
    <div className="p-4 md:p-6">

      <h1 className="text-xl md:text-2xl font-bold mb-6 dark:text-white">
        Doctor Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        <div className="bg-white p-4 md:p-6 rounded shadow">
          <h2>Total Appointments</h2>
          <p className="text-2xl md:text-3xl">{total}</p>
        </div>

        <div className="bg-white p-4 md:p-6 rounded shadow">
          <h2>Upcoming</h2>
          <p className="text-2xl md:text-3xl text-blue-600">
            {upcoming}
          </p>
        </div>

        <div className="bg-white p-4 md:p-6 rounded shadow">
          <h2>Completed</h2>
          <p className="text-2xl md:text-3xl text-green-600">
            {completed}
          </p>
        </div>
      </div>
      <h2 className="text-xl font-bold mt-8 mb-4">
  Video Consultations
</h2>

{videoConsultations.length === 0 ? (
  <p className="text-gray-500">No video consultations yet.</p>
) : (
  videoConsultations.map((vc) => (
    <div
      key={vc.id}
      className="bg-white p-4 rounded-xl shadow-md mb-4"
    >
      <p><strong>Patient:</strong> {vc.patients?.users?.name}</p>
      <p><strong>Token:</strong> {vc.token_number}</p>
      <p><strong>Amount:</strong> ₹{vc.amount}</p>

      <a
        href={vc.meet_link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-3 bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        Attend Meeting
      </a>
    </div>
  ))
)}
      

      {/* Appointment Table */}
      <div className="bg-white p-4 md:p-6 rounded shadow overflow-x-auto">
        <h2 className="text-base md:text-lg font-semibold mb-4">
          My Appointments
        </h2>
       

        <table className="min-w-[700px] w-full border">
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
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() =>
                          updateStatus(app.id, "completed")
                        }
                        className="text-green-600"
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

                      <input
                        type="file"
                        className="text-sm"
                        onChange={async (e) => {
                          const formData = new FormData();
                          formData.append("signature", e.target.files[0]);

                          await api.post("/doctors/upload-signature", formData);
                          alert("Signature uploaded successfully");
                        }}
                      />
                    </div>
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