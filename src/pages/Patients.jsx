import { useEffect, useState } from "react";
import api from "../services/api";

const Patients = () => {
  const [patients, setPatients] = useState([]);

  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");

  /* =========================
     FETCH PATIENTS
  ========================== */
  const fetchPatients = async () => {
    try {
      const { data } = await api.get("/patients");
      setPatients(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  /* =========================
     ADD PATIENT
  ========================== */
  const handleAddPatient = async (e) => {
    e.preventDefault();

    try {
      await api.post("/patients", {
        name,
        email,
        dob,
        height,
        weight,
        blood_group: bloodGroup,
        medical_history: medicalHistory
      });

      // Reset form
      setName("");
      setEmail("");
      setDob("");
      setHeight("");
      setWeight("");
      setBloodGroup("");
      setMedicalHistory("");

      fetchPatients();

    } catch (err) {
      console.error(err);
      alert("Error adding patient");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Patients</h1>

      {/* =========================
         ADD PATIENT FORM
      ========================== */}
      <form
        onSubmit={handleAddPatient}
        className="mb-8 bg-white p-6 rounded-2xl shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4">
          Add Patient
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-lg mb-3"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg mb-3"
          required
        />

        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full p-3 border rounded-lg mb-3"
        />

        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full p-3 border rounded-lg mb-3"
        />

        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full p-3 border rounded-lg mb-3"
        />

        <input
          type="text"
          placeholder="Blood Group"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          className="w-full p-3 border rounded-lg mb-3"
        />

        <textarea
          placeholder="Medical History"
          value={medicalHistory}
          onChange={(e) => setMedicalHistory(e.target.value)}
          className="w-full p-3 border rounded-lg mb-3"
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
        >
          Add Patient
        </button>
      </form>

      {/* =========================
         PATIENT TABLE
      ========================== */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td className="p-2 border">
                {patient.users?.name}
              </td>
              <td className="p-2 border">
                {patient.users?.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Patients;