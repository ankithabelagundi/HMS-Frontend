import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";

const Appointments = () => {
  const { user } = useAuth();

  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [doctorId, setDoctorId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Medical Record States (Doctor Only)
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [prescription, setPrescription] = useState("");
  const [notes, setNotes] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [weight, setWeight] = useState("");
const [diagnosis, setDiagnosis] = useState("");
const [treatment, setTreatment] = useState("");
const [medicines, setMedicines] = useState([
  { medicine: "", dosage: "", frequency: "", duration: "" }
]);
const addMedicine = () => {
  setMedicines([
    ...medicines,
    { medicine: "", dosage: "", frequency: "", duration: "" }
  ]);
};
const removeMedicine = (index) => {
  const updated = medicines.filter((_, i) => i !== index);
  setMedicines(updated);
};

  /* =========================
     FETCH DOCTORS
  ========================== */
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await api.get("/doctors");
        setDoctors(data);
      } catch (err) {
        console.error("Doctor fetch error:", err);
      }
    };

    fetchDoctors();
  }, []);

  /* =========================
     FETCH APPOINTMENTS
  ========================== */
  const fetchAppointments = async () => {
    try {
      const { data } = await api.get("/appointments");
      setAppointments(data);
    } catch (err) {
      console.error("Appointment fetch error:", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  /* =========================
     BOOK APPOINTMENT (PATIENT)
  ========================== */
  const handleBook = async (e) => {
    e.preventDefault();

    if (!doctorId || !appointmentDate) {
      alert("Please select doctor and date");
      return;
    }

    setLoading(true);

    try {
      await api.post("/appointments", {
        doctor_id: doctorId,
        appointment_date: appointmentDate
      });

      setDoctorId("");
      setAppointmentDate("");
      fetchAppointments();
    } catch (err) {
      alert(err.response?.data?.error || "Booking failed");
    }

    setLoading(false);
  };

  /* =========================
     SAVE MEDICAL RECORD (DOCTOR)
  ========================== */
  const handleSaveMedicalRecord = async () => {
    try {
   await api.post("/medical-records", {
  patient_id: selectedAppointment.patient_id,
  diagnosis,
  treatment,
  prescription: medicines,   // IMPORTANT
  notes,
  blood_pressure: bloodPressure,
  weight
});
      // Update appointment status
      await api.put(`/appointments/${selectedAppointment.id}`, {
        status: "completed"
      });

      alert("Medical record saved successfully");

      // Reset
      setSelectedAppointment(null);
      setPrescription("");
      setNotes("");
      setBloodPressure("");
      setWeight("");

      fetchAppointments();

    } catch (error) {
      console.error(error);
      alert("Error saving medical record");
    }
  };

  /* =========================
     CANCEL APPOINTMENT (PATIENT)
  ========================== */
  const handleCancel = async (id) => {
    try {
      await api.put(`/appointments/${id}`, {
        status: "cancelled"
      });

      fetchAppointments();
    } catch (err) {
      console.error("Cancel error:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Appointment Management
      </h1>

      {/* =========================
         BOOKING FORM (PATIENT ONLY)
      ========================== */}
      {user?.role === "patient" && (
        <form
          onSubmit={handleBook}
          className="mb-8 bg-white p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4">
            Book Appointment
          </h2>

          <select
            className="border p-3 rounded-lg w-full mb-4"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.users?.name} — {doc.specialization}
              </option>
            ))}
          </select>

          <input
            type="datetime-local"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4"
            required
          />


          <button
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      )}

      {/* =========================
         APPOINTMENT TABLE
      ========================== */}
      <div className="bg-white p-6 rounded-2xl shadow-lg overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">
          Appointments
        </h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Doctor</th>
              <th className="p-3 border">Patient</th>
              <th className="p-3 border">Date (IST)</th>
              <th className="p-3 border">Status</th>
              {user?.role === "doctor" && (
                <th className="p-3 border">Medical</th>
              )}
              {user?.role === "patient" && (
                <th className="p-3 border">Action</th>
              )}
            </tr>
          </thead>

          <tbody>
            {appointments.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50">
                <td className="p-3 border">
                  {app.doctors?.users?.name}
                </td>

                <td className="p-3 border">
                  {app.patients?.users?.name}
                </td>

                <td className="p-3 border">
                  {new Date(app.appointment_date).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </td>

                <td className="p-3 border capitalize">
                  {app.status}
                </td>

                {/* DOCTOR ACTION */}
                {user?.role === "doctor" && (
                  <td className="p-3 border">
                    {app.status !== "completed" && (
                      <button
                        onClick={() => setSelectedAppointment(app)}
                        className="text-blue-600 hover:underline"
                      >
                        Add Record
                      </button>
                    )}
                  </td>
                )}

                {/* PATIENT CANCEL */}
                {user?.role === "patient" && (
                  <td className="p-3 border">
                    {app.status !== "cancelled" && (
                      <button
                        onClick={() => handleCancel(app.id)}
                        className="text-red-500 hover:underline"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* =========================
         MEDICAL RECORD FORM (DOCTOR)
      ========================== */}
      {selectedAppointment && user?.role === "doctor" && (
        <div className="mt-6 bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            Add Medical Record
          </h2>

        {medicines.map((med, index) => (
  <div key={index} className="border p-3 mb-3 rounded bg-gray-50">

    <input
      placeholder="Medicine Name"
      value={med.medicine}
      onChange={(e) => {
        const updated = [...medicines];
        updated[index].medicine = e.target.value;
        setMedicines(updated);
      }}
      className="w-full p-2 border mb-2"
    />

    <input
      placeholder="Dosage"
      value={med.dosage}
      onChange={(e) => {
        const updated = [...medicines];
        updated[index].dosage = e.target.value;
        setMedicines(updated);
      }}
      className="w-full p-2 border mb-2"
    />

    <input
      placeholder="Frequency"
      value={med.frequency}
      onChange={(e) => {
        const updated = [...medicines];
        updated[index].frequency = e.target.value;
        setMedicines(updated);
      }}
      className="w-full p-2 border mb-2"
    />

    <input
      placeholder="Duration"
      value={med.duration}
      onChange={(e) => {
        const updated = [...medicines];
        updated[index].duration = e.target.value;
        setMedicines(updated);
      }}
      className="w-full p-2 border mb-2"
    />

    {index > 0 && (
      <button
        onClick={() => removeMedicine(index)}
        className="text-red-500 text-sm"
      >
        Remove
      </button>
    )}
  </div>
))}

<button
  onClick={addMedicine}
  className="bg-blue-600 text-white px-4 py-2 rounded"
>
  + Add Medicine
</button>

          <input
            type="text"
            placeholder="Blood Pressure"
            value={bloodPressure}
            onChange={(e) => setBloodPressure(e.target.value)}
            className="w-full p-3 border rounded-lg mb-3"
          />
          <input
  type="text"
  placeholder="Diagnosis"
  value={diagnosis}
  onChange={(e) => setDiagnosis(e.target.value)}
  className="w-full p-3 border rounded-lg mb-3"
/>

<input
  type="text"
  placeholder="Treatment"
  value={treatment}
  onChange={(e) => setTreatment(e.target.value)}
  className="w-full p-3 border rounded-lg mb-3"
/>

          <input
            type="text"
            placeholder="Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-3 border rounded-lg mb-3"
          />

          <textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-3 border rounded-lg mb-3"
          />

          <button
            onClick={handleSaveMedicalRecord}
            className="bg-green-600 text-white px-6 py-2 rounded-lg"
          >
            Save & Complete
          </button>
        </div>
      )}
    </div>
  );
};

export default Appointments;