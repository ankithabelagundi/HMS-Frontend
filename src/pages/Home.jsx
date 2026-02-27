import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [count, setCount] = useState({ success: 0, patients: 0 });
  const sectionsRef = useRef([]);
  const [showEmergency, setShowEmergency] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  

  /* ================= NAVBAR SHRINK ================= */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 

  /* ================= REVEAL ANIMATION ================= */
  useEffect(() => {
    const reveal = () => {
      sectionsRef.current.forEach((section) => {
        if (section) {
          const top = section.getBoundingClientRect().top;
          if (top < window.innerHeight - 100) {
            section.classList.add("active");
          }
        }
      });
    };

    window.addEventListener("scroll", reveal);
    reveal();
    return () => window.removeEventListener("scroll", reveal);
  }, []);

  /* ================= COUNTERS ================= */
  useEffect(() => {
    let s = 0;
    let p = 0;

    const interval = setInterval(() => {
      if (s < 98) s++;
      if (p < 50000) p += 1000;

      setCount({ success: s, patients: p });

      if (s >= 98 && p >= 50000) clearInterval(interval);
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  setMobileOpen(false);
};

  return (
   <div className="font-sans bg-white text-gray-800 transition-colors duration-300 overflow-x-hidden">

      {/* ================= NAVBAR ================= */}
      
<nav
  className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    scrolled
  ? "bg-white dark:bg-gray-800 shadow-lg py-2"
  : "bg-transparent py-6"
  }`}
>
  <div className="flex justify-between items-center px-6 md:px-10">

    {/* Logo */}
    <h1 className={`font-bold text-indigo-700 transition-all duration-300 ${
  scrolled ? "text-xl" : "text-3xl"
}`}>
      WellNest Hospitals
    </h1>

    {/* Desktop Menu */}
    <div className="hidden md:flex gap-8 font-medium">
      <button onClick={() => scrollTo("about")}>About</button>
      <button onClick={() => scrollTo("specializations")}>
        Specializations
      </button>
      <button onClick={() => scrollTo("achievements")}>
        Achievements
      </button>
      <button onClick={() => scrollTo("contact")}>Contact</button>
    </div>

    {/* Desktop Auth Buttons */}
    <div className="hidden md:flex gap-4">
      <button
        onClick={() => navigate("/login")}
        className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg"
      >
        Login
      </button>
      <button
        onClick={() => navigate("/signup")}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
      >
        Sign Up
      </button>
    </div>

    {/* Hamburger Button */}
    <button
      onClick={() => setMobileOpen(!mobileOpen)}
      className="md:hidden text-2xl"
    >
      ☰
    </button>

  </div>

  {/* ================= MOBILE MENU ================= */}
  {mobileOpen && (
    <div className="md:hidden bg-white shadow-lg px-6 py-6 space-y-4">

      <button onClick={() => scrollTo("about")} className="block w-full text-left">
        About
      </button>

      <button onClick={() => scrollTo("specializations")} className="block w-full text-left">
        Specializations
      </button>

      <button onClick={() => scrollTo("achievements")} className="block w-full text-left">
        Achievements
      </button>

      <button onClick={() => scrollTo("contact")} className="block w-full text-left">
        Contact
      </button>

      <hr />

      <button
        onClick={() => navigate("/login")}
        className="block w-full text-left"
      >
        Login
      </button>

      <button
        onClick={() => navigate("/signup")}
        className="block w-full text-left"
      >
        Sign Up
      </button>
    </div>
  )}
</nav>

      {/* ================= HERO ================= */}
      <section
        className="h-screen pt-24 bg-fixed bg-cover bg-center relative flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3')"
        }}
      >
        <div className="absolute inset-0 bg-white/70"></div>

        <div className="relative z-10 max-w-3xl px-6">
          <h2 className="text-5xl font-bold mb-6">
            Excellence in Healthcare
          </h2>

          <p className="text-lg mb-8">
            Advanced treatment with innovation & compassion.
          </p>

          <div className="flex justify-center gap-6">
            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg"
            >
              Book Appointment
            </button>

            <button
              onClick={() => scrollTo("about")}
              className="border border-indigo-600 px-8 py-3 rounded-lg"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section
        id="about"
        ref={(el) => (sectionsRef.current[0] = el)}
        className="py-24 px-10 text-center bg-white dark:bg-gray-900 reveal"
      >
        <h3 className="text-4xl font-bold mb-8">About Us</h3>
        <p className="max-w-4xl mx-auto text-gray-600">
          Delivering world-class healthcare with advanced medical
          infrastructure and expert specialists.
        </p>
      </section>

      {/* ================= SPECIALIZATIONS ================= */}
      <section
        id="specializations"
        ref={(el) => (sectionsRef.current[1] = el)}
        className="py-24 px-10 bg-gray-50 dark:bg-gray-800 reveal"
      >
        <h3 className="text-4xl font-bold text-center mb-16">
          Centers of Excellence
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card text-center">
            <h4 className="text-2xl font-semibold mb-4">Cardiology</h4>
            <p>99% Procedure Success</p>
            <p>10,000+ Surgeries</p>
          </div>

          <div className="glass-card text-center">
            <h4 className="text-2xl font-semibold mb-4">Neurology</h4>
            <p>97% Recovery Rate</p>
            <p>8,000+ Cases</p>
          </div>

          <div className="glass-card text-center">
            <h4 className="text-2xl font-semibold mb-4">Orthopedics</h4>
            <p>96% Success Rate</p>
            <p>12,000+ Surgeries</p>
          </div>
        </div>
      </section>

      {/* ================= MAIN ACHIEVEMENTS ================= */}
      <section
        id="achievements"
        ref={(el) => (sectionsRef.current[2] = el)}
        className="py-24 px-10 bg-indigo-700 dark:bg-indigo-900 text-white reveal"
      >
        <h3 className="text-4xl font-bold mb-12">Our Achievements</h3>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="glass-card">
            <h4 className="text-5xl font-bold">{count.success}%</h4>
            <p>Success Rate</p>
          </div>

          <div className="glass-card">
            <h4 className="text-5xl font-bold">
              {count.patients.toLocaleString()}+
            </h4>
            <p>Patients Treated</p>
          </div>

          <div className="glass-card">
            <h4 className="text-5xl font-bold">200+</h4>
            <p>Expert Doctors</p>
          </div>

          <div className="glass-card">
            <h4 className="text-5xl font-bold">15+</h4>
            <p>Years Experience</p>
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section
        id="contact"
        ref={(el) => (sectionsRef.current[3] = el)}
        className="py-24 px-10 text-center reveal"
      >
        <h3 className="text-4xl font-bold mb-8">Contact Us</h3>
        <p>📍 Bangalore, India</p>
        <p>📞 +91 9876543210</p>
        <p>✉ support@wellnest.com</p>
      </section>

      {/* ================= FLOATING BUTTONS ================= */}
      <button
  onClick={() => setShowEmergency(true)}
  className="fixed bottom-20 right-6 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700"
>
  🚑 Emergency
</button>

      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg"
      >
        💬 WhatsApp
      </a>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-2xl shadow-2xl w-96 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center">
              Book Appointment
            </h2>

            <button
              onClick={() => {
                setShowModal(false);
                navigate("/signup");
              }}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg mb-4"
            >
              Register First
            </button>

            <button
              onClick={() => setShowModal(false)}
              className="w-full border py-3 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {showEmergency && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white p-10 rounded-2xl shadow-2xl w-96 relative">

      <button
        onClick={() => setShowEmergency(false)}
        className="absolute top-4 right-4"
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
        Emergency Contact
      </h2>

      <p className="text-center mb-6">
        For immediate assistance call our 24/7 emergency number.
      </p>

      <a
        href="tel:+919876543210"
        className="block w-full bg-red-600 text-white py-3 rounded-lg text-center hover:bg-red-700"
      >
        Call +91 9876543210
      </a>

      <p className="text-sm text-gray-500 mt-4 text-center">
        Ambulance available within 10 minutes.
      </p>
    </div>
  </div>
)}

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6">
        © 2026 WellNest Hospitals. All rights reserved.
      </footer>

      {/* ================= STYLES ================= */}
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }
      
       .glass-card {
  background: white;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  padding: 2rem;
  border-radius: 1rem;
}
      `}</style>
    </div>
  );
};

export default Home;