import { useState, useEffect } from "react";
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

  useEffect(() => {
    fetchDoctors();
  }, []);

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
      setSpecialization("");
      fetchDoctors();
    } catch (err) {
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
    <div className="p-4 md:p-8 space-y-8">

      <h1 className="text-xl md:text-2xl font-bold dark:text-white">
        Create Doctor
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleCreate}
        className="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-xl shadow-md 
                   w-full max-w-lg transition-colors"
      >
        <div className="space-y-4">

          <input
            type="text"
            placeholder="Doctor Name"
            className="w-full p-3 border rounded-lg
                       bg-white dark:bg-gray-800
                       text-gray-900 dark:text-white
                       border-gray-300 dark:border-gray-600
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg
                       bg-white dark:bg-gray-800
                       text-gray-900 dark:text-white
                       border-gray-300 dark:border-gray-600
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg
                       bg-white dark:bg-gray-800
                       text-gray-900 dark:text-white
                       border-gray-300 dark:border-gray-600
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Responsive Select */}
          <select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="w-full p-3 border rounded-lg appearance-none
                       bg-white dark:bg-gray-800
                       text-gray-900 dark:text-white
                       border-gray-300 dark:border-gray-600
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Specialization</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Neurology">Neurology</option>
            <option value="General Physician">General Physician</option>
          </select>

          <button
            disabled={loading}
            className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700
                       text-white px-6 py-3 rounded-lg transition"
          >
            {loading ? "Creating..." : "Create Doctor"}
          </button>

        </div>
      </form>

      {/* DOCTORS LIST */}
      <div>
        <h2 className="text-lg md:text-xl font-bold mb-4 dark:text-white">
          Doctors List ({doctors.length})
        </h2>

        {/* Mobile Scroll Wrapper */}
        <div className="overflow-x-auto rounded-xl shadow-md">
          <table className="min-w-[600px] w-full bg-white dark:bg-gray-900 
                            border border-gray-200 dark:border-gray-700 
                            transition-colors">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800 text-left">
                <th className="p-3 border dark:border-gray-700">Name</th>
                <th className="p-3 border dark:border-gray-700">Email</th>
                <th className="p-3 border dark:border-gray-700">Specialization</th>
                <th className="p-3 border dark:border-gray-700">Action</th>
              </tr>
            </thead>

            <tbody>
              {doctors.map((doc) => (
                <tr
                  key={doc.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="p-3 border dark:border-gray-700">
                    {doc.users?.name}
                  </td>
                  <td className="p-3 border dark:border-gray-700">
                    {doc.users?.email}
                  </td>
                  <td className="p-3 border dark:border-gray-700">
                    {doc.specialization}
                  </td>
                  <td className="p-3 border dark:border-gray-700">
                    <button
                      type="button"
                      onClick={() => handleDelete(doc.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
};

export default CreateDoctor;