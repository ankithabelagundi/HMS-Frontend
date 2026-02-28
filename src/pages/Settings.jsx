import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Settings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  /* Load user data */
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || ""
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* Save Profile */
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.put("/users/profile", {
        name: form.name,
        email: form.email,
        phone: form.phone
      });

      setMessage("Profile updated successfully");
    } catch (err) {
      setMessage("Update failed");
    }

    setLoading(false);
  };

  /* Change Password */
  const handlePasswordChange = async () => {
    if (form.newPassword !== form.confirmPassword) {
      return setMessage("Passwords do not match");
    }

    try {
      await api.put("/users/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword
      });

      setMessage("Password changed successfully");
    } catch (err) {
      setMessage("Password update failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 dark:bg-gray-900 transition-colors dark:text-white">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold dark:text-white">Account Settings</h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="text-indigo-600 hover:underline"
        >
          ← Back
        </button>
      </div>

      {/* Profile Section */}
      <div className="bg-white p-8 rounded-2xl shadow space-y-6 dark:bg-gray-900 transition-colors dark:text-white">

        <h2 className="text-lg font-semibold">Profile Information</h2>

        {message && (
          <p className="text-sm text-green-600">{message}</p>
        )}

        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Phone Number</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-white dark-bg-gray-900 transition-colors">Role</label>
            <input
              value={user?.role}
              disabled
              className="w-full p-2 border rounded 
bg-white text-gray-900 
dark:bg-gray-800 dark:text-white 
border-gray-300 dark:border-gray-600 
focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="md:col-span-2">
            <button
              disabled={loading}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>

      {/* Password Section */}
      <div className="bg-white p-8 rounded-2xl shadow space-y-6 dark:text-white  dark:bg-gray-900 transition-colors">

        <h2 className="text-lg font-semibold">Change Password</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={form.currentPassword}
            onChange={handleChange}
            className="p-3 border rounded-lg"
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            className="p-3 border rounded-lg"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="p-3 border rounded-lg"
          />

        </div>

        <button
          onClick={handlePasswordChange}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
        >
          Update Password
        </button>

      </div>

    </div>
  );
};

export default Settings;