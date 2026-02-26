import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow">
      <h1
        onClick={() => navigate("/")}
        className="text-xl font-bold cursor-pointer"
      >
        XYZ Hospital
      </h1>

      <div className="space-x-4">
        <button
          onClick={() => navigate("/login")}
          className="text-blue-600"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/signup")}
          className="bg-linear-to-r from-indigo-500 to-purple-600 hover:scale-105 transition transform text-white p-2 rounded-lg shadow-md"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Navbar;