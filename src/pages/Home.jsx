import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/theme-toggle";

const Home = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [count, setCount] = useState({ success: 0, patients: 0 });
  const sectionsRef = useRef([]);
  const [showEmergency, setShowEmergency] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [activeSpeciality, setActiveSpeciality] = useState("Cardiology");
  const specialityData = {
  Cardiology: {
    icon: "❤️",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop",
    description:
      "Advanced heart care including bypass surgery, angioplasty and cardiac diagnostics."
  },
  Orthopedics: {
    icon: "🦴",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.IwFhw23hqFWz_0tX8vIE-QHaE0?pid=Api&P=0&h=180",
    description:
      "Comprehensive bone and joint treatments including replacements."
  },
  Oncology: {
    icon: "🧬",
    image:
      "https://storage.googleapis.com/craft-production-static-content/prod/_1024xAUTO_crop_center-center_none_ns/94535/oncologynursecancertreatment.webp",
    description:
      "Precision cancer treatment with chemotherapy and surgical oncology."
  },
  Nephrology: {
    icon: "🩺",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.0AqWGXEEFaDxb5YO71YUxgHaHa?pid=Api&P=0&h=180",
    description:
      "Expert kidney care including dialysis and transplant management."
  }
};

  

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
   <div className="font-sans bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 transition-colors duration-300">

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
    {/* Desktop Auth Buttons */}
<div className="hidden md:flex gap-4 items-center">

  <ThemeToggle />

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
      <button onClick={() => scrollTo("video")}>
  Video Consultation
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
        className="min-h-screen bg-fixed bg-cover bg-center relative flex items-center justify-center text-center"
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
  onClick={() => setShowVideoModal(true)}
  className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg"
>
  Video Consultation
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
        <h3 className="text-4xl font-bold mb-8 dark:text-white">About Us</h3>
        <p className="max-w-4xl mx-auto text-gray-600 dark:text-white">
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
      <section
  id="video"
  className="py-24 px-10 bg-indigo-50 dark:bg-gray-950 text-center transition-colors"
>

{/* ================= SPECIALITY SHOWCASE ================= */}
<div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start mb-20">

  {/* LEFT SIDE - SPECIALITY CARDS */}
  <div className="grid grid-cols-2 gap-6">

    {Object.keys(specialityData).map((key) => (
      <div
        key={key}
        onClick={() => setActiveSpeciality(key)}
      className={`cursor-pointer border rounded-2xl p-8 text-center transition-all duration-300
  ${
    activeSpeciality === key
      ? "border-indigo-600 shadow-xl bg-white dark:bg-gray-800"
      : "bg-white dark:bg-gray-800 hover:shadow-md"
  }`}
      >
        <div className="text-5xl mb-4">
          {specialityData[key].icon}
        </div>
        <h4 className="font-semibold text-lg">{key}</h4>
      </div>
    ))}

  </div>

  {/* RIGHT SIDE - IMAGE + CONTENT */}
  <div>

    <img
      src={specialityData[activeSpeciality].image}
      alt="speciality"
      className="w-full h-[400px] object-cover rounded-2xl shadow-lg mb-8"
    />

    <h4 className="text-4xl font-bold mb-4">
      {activeSpeciality}
    </h4>

    <p className="text-gray-600 text-lg leading-relaxed dark:text-white">
      {specialityData[activeSpeciality].description}
    </p>

  </div>

</div>


  <h3 className="text-4xl font-bold mb-6">
    Online Video Consultation
  </h3>

  <p className="max-w-3xl mx-auto text-gray-600 mb-10 dark:text-white">
    Consult our expert doctors from the comfort of your home.
    Secure video sessions with digital prescriptions.
  </p>

  <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
    
    <div className="glass-card">
      <h4 className="text-xl font-semibold mb-3">Book Slot</h4>
      <p>Select your preferred doctor & time.</p>
    </div>

    <div className="glass-card">
      <h4 className="text-xl font-semibold mb-3">Join Video Call</h4>
      <p>Secure HD consultation session.</p>
    </div>

    <div className="glass-card">
      <h4 className="text-xl font-semibold mb-3">Get E-Prescription</h4>
      <p>Download prescription instantly.</p>
    </div>

  </div>

  <button
    onClick={() => setShowVideoModal(true)}
    className="mt-10 bg-indigo-600 text-white px-8 py-3 rounded-lg"
  >
    Start Video Consultation
  </button>
</section>

      {/* ================= MAIN ACHIEVEMENTS ================= */}
<section
  id="achievements"
  ref={(el) => (sectionsRef.current[2] = el)}
 className="py-24 px-10 bg-gradient-to-r from-indigo-800 to-indigo-600 text-white reveal"
>
  <h3 className="text-4xl font-bold mb-12 text-center">
    Our Achievements
  </h3>

  <div className="grid md:grid-cols-4 gap-8">

    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl text-center">
      <h4 className="text-5xl font-bold">{count.success}%</h4>
      <p className="mt-2 text-gray-200">Success Rate</p>
    </div>

    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl text-center">
      <h4 className="text-5xl font-bold">
        {count.patients.toLocaleString()}+
      </h4>
      <p className="mt-2 text-gray-200">Patients Treated</p>
    </div>

    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl text-center">
      <h4 className="text-5xl font-bold">200+</h4>
      <p className="mt-2 text-gray-200">Expert Doctors</p>
    </div>

    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl text-center">
      <h4 className="text-5xl font-bold">15+</h4>
      <p className="mt-2 text-gray-200">Years Experience</p>
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

{showVideoModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white p-10 rounded-2xl shadow-2xl w-96 relative">

      <button
        onClick={() => setShowVideoModal(false)}
        className="absolute top-4 right-4"
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center">
        Video Consultation
      </h2>

      <button
        onClick={() => {
          setShowVideoModal(false);
          navigate("/signup");
        }}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg mb-4"
      >
        Register & Book
      </button>

      <button
        onClick={() => setShowVideoModal(false)}
        className="w-full border py-3 rounded-lg"
      >
        Cancel
      </button>

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
  transition: background 0.3s ease, color 0.3s ease;
}

.dark .glass-card {
  background: #1f2937; /* gray-800 */
}
      `}</style>
    </div>
  );
};

export default Home;