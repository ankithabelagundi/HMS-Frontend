import { useState } from "react";
import api from "../services/api";

const Settings = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await api.put("/users/profile", { name });
      setMessage("Profile updated successfully");
    } catch (err) {
      setMessage("Update failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-md">
      <h2 className="text-xl font-bold mb-4">Settings</h2>

      {message && <p className="mb-3 text-green-600">{message}</p>}

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="New Name"
          className="w-full p-2 border mb-3"
          onChange={(e) => setName(e.target.value)}
        />

        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
};

export default Settings;