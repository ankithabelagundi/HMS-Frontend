import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";
import jsPDF from "jspdf";
import logo from "../assets/logo.png";

const MedicalRecords = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);

  // Fetch Records
  const fetchRecords = async () => {
    try {
      const { data } = await api.get("/medical-records");
      setRecords(data);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // Generate Prescription PDF
  const generatePrescriptionPDF = (record) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("WELLNEST HOSPITAL", 20, 20);

  doc.addImage(logo, "PNG", 150, 10, 40, 20);

  doc.setFontSize(12);
  doc.text("Prescription", 20, 35);

  doc.text(`Doctor: ${record.doctors?.users?.name || "-"}`, 20, 45);
  doc.text(`Patient: ${record.patients?.users?.name || "-"}`, 20, 55);
  doc.text(
    `Date: ${new Date(record.created_at).toLocaleDateString()}`,
    20,
    65
  );

  let y = 80;

  doc.text("Prescription:", 20, y);
  y += 10;

  doc.text(record.prescription || "-", 20, y);
  y += 10;

  doc.text(`Blood Pressure: ${record.blood_pressure || "-"}`, 20, y);
  y += 10;

  doc.text(`Weight: ${record.weight || "-"}`, 20, y);
  y += 10;

  doc.text("Notes:", 20, y);
  y += 10;

  doc.text(record.notes || "-", 20, y);

  y += 20;
  doc.text("Doctor Signature: ___________________", 20, y);

  doc.save("Prescription.pdf");
};
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Medical Records</h1>

      {records.length === 0 && (
        <p className="text-gray-500">No medical records found.</p>
      )}

      <div className="space-y-6">
        {records.map((record) => (
          <div
            key={record.id}
            className="bg-white p-6 rounded shadow border-l-4 border-indigo-500"
          >
            <h2 className="font-semibold text-lg">
              {record.patients?.users?.name}
            </h2>

            <p className="text-gray-600 text-sm">
              Doctor: {record.doctors?.users?.name}
            </p>

            <p className="mt-2">
              <strong>Diagnosis:</strong> {record.diagnosis}
            </p>

            <p>
              <strong>Treatment:</strong> {record.treatment}
            </p>

            <p>
              <strong>Blood Pressure:</strong> {record.blood_pressure}
            </p>

            <p>
              <strong>Weight:</strong> {record.weight}
            </p>

            <p>
              <strong>Notes:</strong> {record.notes}
            </p>

            {/* Prescription List */}
            {Array.isArray(record.prescription) &&
              record.prescription.map((med, index) => (
                <div
                  key={index}
                  className="mt-2 p-2 bg-gray-100 rounded"
                >
                  <p>
                    <strong>{med.medicine}</strong>
                  </p>
                  <p>
                    {med.dosage} — {med.frequency}
                  </p>
                  <p>Duration: {med.duration}</p>
                </div>
              ))}

            {/* Print Button */}
            <button
              onClick={() => generatePrescriptionPDF(record)}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              Print Prescription
            </button>

            <p className="text-xs text-gray-500 mt-3">
              {new Date(record.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalRecords;