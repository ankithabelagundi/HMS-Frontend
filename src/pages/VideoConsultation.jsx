import { useEffect, useState } from "react";
import api from "../services/api";

const VideoConsultation = () => {
  const [date, setDate] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
 
  

  useEffect(() => {
  const fetchDoctors = async () => {
    try {
      const response = await api.get("/doctors");
      console.log("FULL RESPONSE:", response);
      console.log("DATA:", response.data);
      setDoctors(response.data.data || response.data);
    } catch (err) {
      console.error("Doctor fetch error:", err);
    }
  };

  fetchDoctors();
}, []);

  // ✅ MOVE FUNCTION INSIDE COMPONENT
 const handleBook = async () => {
  if (!selectedDoctor) {
    alert("Please select doctor");
    return;
  }

  try {
    //  Create order
      const { data } = await api.post("/billing/create-order", {
  doctor_id: selectedDoctor,
  date,
  amount: 500
});

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: "INR",
      name: "Clinic Video Consultation",
      order_id: data.id,

      handler: async function (response) {

        //  Verify payment
        const verifyRes = await api.post("/billing/verify", {
  razorpay_order_id: response.razorpay_order_id,
  razorpay_payment_id: response.razorpay_payment_id,
  razorpay_signature: response.razorpay_signature,
  consultation_id: data.consultation_id
});

        if (verifyRes.data.meet_link) {
          window.location.href = verifyRes.data.meet_link;
        } else {
          alert("Payment successful but meeting link missing.");
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    //  Create billing entry
const { data: billing } = await supabase
  .from("billing")
  .insert([{
    patient_id: consultation.patient_id,
    total_amount: consultation.amount,
    status: "paid",
    type: "video_consultation"  // 🔥 add this column if not exists
  }])
  .select()
  .single();

// Insert payment record
await supabase
  .from("payments")
  .insert([{
    billing_id: billing.id,
    payment_method: "razorpay",
    paid_amount: consultation.amount
  }]);

  } catch (err) {
    console.error("Booking error:", err);
  }
};

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Book Video Consultation
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md space-y-4 max-w-lg">

       <select
  className="w-full bg-gray-50 border border-gray-300
             focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
             p-3 rounded-xl shadow-sm dark:text-white dark:bg-gray-900 transition-colors"
  value={selectedDoctor}
  onChange={(e) => setSelectedDoctor(e.target.value)}
>
  <option value="">Select Doctor</option>

  {doctors.map((doc) => (
    <option key={doc.id} value={doc.id}>
      {doc.users?.name} — {doc.specialization}
    </option>
  ))}
</select>

        <input
          type="date"
          className="w-full border p-2 rounded"
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          onClick={handleBook}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg"
        >
          Proceed to Payment
        </button>

      </div>
    </div>
  );
};

export default VideoConsultation;