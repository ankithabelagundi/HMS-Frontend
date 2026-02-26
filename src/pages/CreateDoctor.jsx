import { useState } from "react";
import api from "../services/api";

const CreateDoctor = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [doctors, setDoctors] = useState([]);

  const [loading, setLoading] = useState(false);
  const fetchDoctors = async () => {
  try {
    const { data } = await api.get("/doctors");
    setDoctors(data);
  } catch (err) {
    console.error(err);
  }
}; 


fetchDoctors(); // refresh list

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/auth/create-user", {
  name,
  email,
  password,
  role: "doctor",
  specialization
});

      alert("Doctor created successfully");
      setName("");
      setEmail("");
      setPassword("");
     

    } catch (err) {
      console.log("FULL ERROR:", err);
  console.log("RESPONSE:", err.response?.data);
  alert(err.response?.data?.error || "Failed");
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Delete this doctor?");
  if (!confirmDelete) return;

  try {
    await api.delete(`/doctors/${id}`);
    fetchDoctors();
  } catch (err) {
    alert("Delete failed");
  }
};

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create Doctor</h1>

      <form onSubmit={handleCreate} className="bg-white p-6 rounded shadow w-96">

        <input
          type="text"
          placeholder="Doctor Name"
          className="w-full p-2 border mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

    <select
  className="w-full p-2 border mb-3 rounded"
  value={specialization}
  onChange={(e) => setSpecialization(e.target.value)}
>
  <option value="">Select Specialization</option>
  <option value="Cardiology">Cardiology</option>
  <option value="Dermatology">Dermatology</option>
  <option value="Orthopedics">Orthopedics</option>
  <option value="Neurology">Neurology</option>
  <option value="General Physician">General Physician</option>
</select>

         <h2 className="text-xl font-bold mt-8 mb-4">
  Doctors List ({doctors.length})
</h2>

<table className="w-full border bg-white rounded shadow">
  <thead>
    <tr className="bg-gray-100">
      <th className="p-2 border">Name</th>
      <th className="p-2 border">Email</th>
      <th className="p-2 border">Specialization</th>
      <th className="p-2 border">Action</th>
    </tr>
  </thead>

  <tbody>
    {doctors.map((doc) => (
      <tr key={doc.id}>
        <td className="p-2 border">{doc.users?.name}</td>
        <td className="p-2 border">{doc.users?.email}</td>
        <td className="p-2 border">{doc.specialization}</td>
        <td className="p-2 border">
          <button
  type="button"
  onClick={() => handleDelete(doc.id)}
  className="text-red-500"
>
  Delete
</button>
        </td>
      </tr>
    ))}
  </tbody>
</table> 


        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Creating..." : "Create Doctor"}
        </button>
        

      </form>
    </div>
  );
};

export default CreateDoctor;