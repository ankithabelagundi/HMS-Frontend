import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Signup = () => {
  const navigate = useNavigate();

  // ================= STATE =================
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ================= VALIDATION REGEX =================
  const emailRegex = /^[A-Za-z0-9._%+-]+@(gmail|yahoo)\.com$/;
    const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;


  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Email validation
    if (!emailRegex.test(email)) {
      setError("Email must be @gmail.com or @yahoo.com");
      return;
    }

    // Password validation
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be 7-9 characters with uppercase, lowercase, number and special character."
      );
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        role: "patient"
      });

      navigate("/login");

    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Sign Up
        </h2>

        {error && (
          <p className="text-red-500 mb-4 text-sm text-center">
            {error}
          </p>
        )}

        <input
          type="text"
          autoComplete="off"
          placeholder="Name"
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          autoComplete="off"
          placeholder="Email"
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            autoComplete="off"
            placeholder="Password"
            className="w-full p-3 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className="mt-4 text-sm text-center">
  Already have an account?{" "}
  <span
    className="text-indigo-600 cursor-pointer hover:underline"
    onClick={() => navigate("/login")}
  >
    Login
  </span>
</p>

          <span
            className="absolute right-3 top-3 cursor-pointer select-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            👁
          </span>
        </div>

        <button
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg transition duration-200 flex items-center justify-center"
        >
          {loading ? (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Create Account"
          )}
        </button>
      </form>
    </div>
  );
};

export default Signup;