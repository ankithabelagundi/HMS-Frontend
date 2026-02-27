import { useState } from "react";
import api from "../services/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    try {
      await api.post("/auth/forgot-password", { email });
      alert("Password reset link sent (demo)");
    } catch (err) {
      alert("User not found");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-96 space-y-4">
        <h2 className="text-xl font-bold text-center">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full bg-indigo-600 text-white p-3 rounded"
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;