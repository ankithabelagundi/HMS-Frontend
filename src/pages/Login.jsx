import { useState, useContext, useEffect } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  /* =========================
     Load Remembered Email
  ========================== */
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  /* =========================
     Login Submit
  ========================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await api.post("/auth/login", {
        email,
        password
      });

      if (rememberMe) {
        localStorage.setItem("rememberEmail", email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      login(data);
      navigate("/dashboard");

    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors">

      {/* LEFT SIDE – Hospital Branding */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex-col justify-center items-center p-12">
        <h1 className="text-4xl font-bold mb-4">Wellnest Hospital</h1>
        <p className="text-lg opacity-90 text-center">
          Smart Healthcare Management System  
          <br /> Secure • Professional • Modern
        </p>
      </div>

      {/* RIGHT SIDE – Login Form */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8  dark:bg-gray-950 transition-colors rounded-2xl shadow-xl w-96 space-y-5"
        >
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            Login to Your Account
          </h2>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Email */}
          <input
            type="email"
            autoComplete="off"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg  dark:text-white  focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="off"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg  dark:text-white  pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />

            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500  dark:text-white "
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          {/* Remember Me + Forgot */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>

            <span
              onClick={() => navigate("/forgot-password")}
              className="text-indigo-600 cursor-pointer hover:underline"
            >
              Forgot Password?
            </span>
          </div>

          {/* Login Button */}
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg transition">
            Login
          </button>

          <p className="text-center text-sm text-gray-900 dark:text-white">
            Don’t have an account?{" "}
            <span
              className="text-indigo-600 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;