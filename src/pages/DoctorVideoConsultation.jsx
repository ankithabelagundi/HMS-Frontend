import { useEffect, useState } from "react";
import api from "../services/api";

const DoctorVideoConsultations = () => {
  const [videoConsultations, setVideoConsultations] = useState([]);

  useEffect(() => {
    const fetchVideoConsultations = async () => {
      try {
        const { data } = await api.get("/dashboard/doctor/video-consultations");
        setVideoConsultations(data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchVideoConsultations();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Video Consultations
      </h1>

      {videoConsultations.length === 0 ? (
        <p className="text-gray-500">No video consultations available.</p>
      ) : (
        videoConsultations.map((vc) => (
          <div
            key={vc.id}
            className="bg-white p-5 rounded-xl shadow-md mb-4"
          >
            <p><strong>Token:</strong> {vc.token_number}</p>
            <p><strong>Amount:</strong> ₹{vc.amount}</p>
            <p><strong>Date:</strong> {new Date(vc.created_at).toLocaleString()}</p>

            <a
              href={vc.meet_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Attend Meeting
            </a>
          </div>
        ))
      )}
    </div>
  );
};

export default DoctorVideoConsultations;