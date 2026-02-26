const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-teal-100 via-white to-indigo-100 flex flex-col items-center justify-center px-6">

      <h1 className="text-5xl font-bold text-gray-800 mb-6">
        Welcome to WellNest Hospital
      </h1>

      <p className="text-gray-600 text-lg mb-8 text-center max-w-xl">
        Advanced care. Smart management. Trusted healthcare.
        Book appointments, manage records and stay healthy.
      </p>

      <div className="flex gap-6">
        <a href="/login"
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition">
          Login
        </a>

        <a href="/signup"
          className="bg-white text-indigo-600 px-6 py-3 rounded-xl shadow-lg border border-indigo-200 hover:scale-105 transition">
          Sign Up
        </a>
      </div>
    </div>
  );
}; 
export default Home;