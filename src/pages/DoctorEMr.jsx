import { useState, useEffect } from "react";
import api from "../services/api";

const [prescription, setPrescription] = useState([
  { medicine: "", dosage: "", frequency: "", duration: "" }
]);
const addMedicine = () => {
  setPrescription([
    ...prescription,
    { medicine: "", dosage: "", frequency: "", duration: "" }
  ]);
};
const handlePrescriptionChange = (index, field, value) => {
  const updated = [...prescription];
  updated[index][field] = value;
  setPrescription(updated);
};

const DoctorEMR = () => {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    patient_id: "",
    diagnosis: "",
    treatment: "",
    prescription: "",
    notes: "",
    blood_pressure: "",
    weight: ""
  });

  useEffect(() => {
    const fetchPatients = async () => {
      const { data } = await api.get("/patients");
      setPatients(data);
    };
    fetchPatients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    alert("EMR Created");
    await api.post("/medical-records", {
  ...form,
  prescription
});
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Create EMR</h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        <select
          value={form.patient_id}
          onChange={(e) =>
            setForm({ ...form, patient_id: e.target.value })
          }
          className="w-full p-2 border"
        >
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.users?.name}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Diagnosis"
          className="w-full p-2 border"
          onChange={(e) =>
            setForm({ ...form, diagnosis: e.target.value })
          }
        />

        <textarea
          placeholder="Treatment"
          className="w-full p-2 border"
          onChange={(e) =>
            setForm({ ...form, treatment: e.target.value })
          }
        />

        <textarea
          placeholder="Prescription"
          className="w-full p-2 border"
          onChange={(e) =>
            setForm({ ...form, prescription: e.target.value })
          }
        />

        <input
          placeholder="Blood Pressure"
          className="w-full p-2 border"
          onChange={(e) =>
            setForm({ ...form, blood_pressure: e.target.value })
          }
        />

        <input
          placeholder="Weight"
          className="w-full p-2 border"
          onChange={(e) =>
            setForm({ ...form, weight: e.target.value })
          }
        />

        <textarea
          placeholder="Additional Notes"
          className="w-full p-2 border"
          onChange={(e) =>
            setForm({ ...form, notes: e.target.value })
          }
        />

        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          Save EMR
        </button>
      </form>
      <h3 className="font-semibold mt-4">Prescription</h3>

{prescription.map((med, index) => (
  <div key={index} className="grid grid-cols-2 gap-2 mb-3">

    <input
      placeholder="Medicine"
      className="border p-2"
      onChange={(e) =>
        handlePrescriptionChange(index, "medicine", e.target.value)
      }
    />

    <input
      placeholder="Dosage"
      className="border p-2"
      onChange={(e) =>
        handlePrescriptionChange(index, "dosage", e.target.value)
      }
    />

    <input
      placeholder="Frequency"
      className="border p-2"
      onChange={(e) =>
        handlePrescriptionChange(index, "frequency", e.target.value)
      }
    />

    <input
      placeholder="Duration"
      className="border p-2"
      onChange={(e) =>
        handlePrescriptionChange(index, "duration", e.target.value)
      }
    />

  </div>
))}

<button
  type="button"
  onClick={addMedicine}
  className="bg-gray-200 px-3 py-1 rounded"
>
  + Add Medicine
</button>
    </div>
  );
};

export default DoctorEMR;