import { useEffect, useState } from "react";
import api from "../services/api";

const AdminStaff = () => {
  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // CREATE STAFF STATES
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchStaff();
  }, [search, page]);

  const fetchStaff = async () => {
    const { data } = await api.get(
      `/admin/staff?search=${search}&page=${page}`
    );
    setStaff(data.data);
    setTotalPages(data.totalPages);
  };

  const handleCreate = async () => {
    if (!name || !email || !password) {
      alert("All fields required");
      return;
    }

    try {
      await api.post("/admin/create-staff", {
        name,
        email,
        password
      });

      alert("Staff created successfully");
      setName("");
      setEmail("");
      setPassword("");
      fetchStaff();

    } catch (error) {
      alert(error.response?.data?.error || "Error creating staff");
    }
  };

  const deleteStaff = async (id) => {
    if (!window.confirm("Are you sure you want to delete this staff?")) return;

    await api.delete(`/admin/staff/${id}`);
    fetchStaff();
  };

  const toggleStatus = async (id) => {
    await api.put(`/admin/staff/${id}/toggle`);
    fetchStaff();
  };

  const handleResetPassword = async (id) => {
    const newPassword = prompt("Enter new password:");
    if (!newPassword) return;

    await api.put(`/admin/staff/${id}/reset-password`, {
      newPassword
    });

    alert("Password reset successfully");
  };

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">

      <h1 className="text-2xl md:text-3xl font-bold dark:text-white">Staff Management</h1>

      {/* ================= CREATE STAFF ================= */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow space-y-4 w-full md:max-w-md">
        <h2 className="text-lg font-semibold">Create Staff</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          onClick={handleCreate}
          className="bg-indigo-600 text-white w-full py-2 rounded hover:bg-indigo-700"
        >
          Create Staff
        </button>
      </div>

      {/* ================= SEARCH ================= */}
      <input
        type="text"
        placeholder="Search staff..."
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
        className="border p-2 rounded w-full md:w-64"
      />

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-xl shadow p-4 md:p-6">
        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Role</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{s.name}</td>
                  <td className="p-3 border">{s.email}</td>

                  <td className="p-3 border">
                    <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-sm">
                      {s.role}
                    </span>
                  </td>

                  <td className="p-3 border">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        s.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>

                  <td className="p-3 border space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => toggleStatus(s.id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Toggle
                    </button>

                    <button
                      onClick={() => handleResetPassword(s.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Reset Password
                    </button>

                    <button
                      onClick={() => deleteStaff(s.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= PAGINATION ================= */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminStaff;