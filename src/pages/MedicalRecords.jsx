import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";
import jsPDF from "jspdf";
//import logo from "../assets/logo.png";


const MedicalRecords = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const { data } = await api.get("/medical-records");
      setRecords(data);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  /* =====================================================
     GENERATE PRESCRIPTION PDF
  ===================================================== */
  const generatePrescriptionPDF = async (record) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("WELLNEST HOSPITAL", 20, 20);

  doc.setFontSize(12);
  doc.text("Prescription", 20, 30);

  doc.text(`Doctor: ${record.doctors?.users?.name || "-"}`, 20, 40);
  doc.text(`Patient: ${record.patients?.users?.name || "-"}`, 20, 50);
  doc.text(
    `Date: ${new Date(record.created_at).toLocaleDateString()}`,
    20,
    60
  );

  let y = 75;

  // Diagnosis
  doc.setFontSize(13);
  doc.text("Diagnosis:", 20, y);
  y += 8;

  doc.setFontSize(11);
  doc.text(record.diagnosis || "-", 20, y);
  y += 12;

  // Treatment
  doc.setFontSize(13);
  doc.text("Treatment:", 20, y);
  y += 8;

  doc.setFontSize(11);
  doc.text(record.treatment || "-", 20, y);
  y += 12;

  // Prescription
  doc.setFontSize(13);
  doc.text("Prescription:", 20, y);
  y += 10;

  const prescriptions = Array.isArray(record.prescription)
    ? record.prescription
    : [];

  if (prescriptions.length === 0) {
    doc.text("-", 20, y);
    y += 10;
  } else {
    prescriptions.forEach((med, index) => {
      doc.setFontSize(11);
      doc.text(`${index + 1}. ${med.medicine || "-"}`, 20, y);
      y += 8;

      doc.text(
        `Dosage: ${med.dosage || "-"} | Frequency: ${med.frequency || "-"} | Duration: ${med.duration || "-"}`,
        25,
        y
      );
      y += 12;
    });
  }

  // Vitals
  doc.setFontSize(12);
  doc.text(`Blood Pressure: ${record.blood_pressure || "-"}`, 20, y);
  y += 10;

  doc.text(`Weight: ${record.weight || "-"}`, 20, y);
  y += 12;

  // Notes
  doc.setFontSize(13);
  doc.text("Notes:", 20, y);
  y += 8;

  doc.setFontSize(11);
  doc.text(record.notes || "-", 20, y);

  y += 20;
  if (record.doctors?.signature_url) {
  const img = await loadImage(record.doctors.signature_url);
  doc.addImage(img, "PNG", 120, y, 50, 20);
}

  doc.text("Doctor Signature: ___________________", 20, y);

  doc.save("Prescription.pdf");
};
const handleDelete = async (id) => {
  try {
    await api.delete(`/medical-records/${id}`);
    fetchRecords();
  } catch (error) {
    console.error("Delete error:", error);
  }
};
const handleEdit = (record) => {
  setEditingRecord(record);
};
const handleUpdate = async () => {
  try {
    await api.put(`/medical-records/${editingRecord.id}`, editingRecord);
    setEditingRecord(null);
    fetchRecords();
  } catch (error) {
    console.error("Update error:", error);
  }
};
return (
  <div className="p-4 md:p-6">

    <h1 className="text-xl md:text-2xl font-bold mb-6 dark:text-white">
      Medical Records
    </h1>

    {records.length === 0 && (
      <p className="text-gray-500">No medical records found.</p>
    )}

    <div className="space-y-4 md:space-y-6">
      {records.map((record) => (
        <div
          key={record.id}
          className="bg-white p-4 md:p-6 rounded shadow border-l-4 border-indigo-500"
        >
          <h2 className="font-semibold text-base md:text-lg">
            {record.patients?.users?.name}
          </h2>

          <p className="text-gray-600 text-sm">
            Doctor: {record.doctors?.users?.name}
          </p>

          <p className="text-sm md:text-base">
            <strong>Diagnosis:</strong> {record.diagnosis}
          </p>
          <p className="text-sm md:text-base">
            <strong>Treatment:</strong> {record.treatment}
          </p>
          <p className="text-sm md:text-base">
            <strong>Blood Pressure:</strong> {record.blood_pressure}
          </p>
          <p className="text-sm md:text-base">
            <strong>Weight:</strong> {record.weight}
          </p>
          <p className="text-sm md:text-base">
            <strong>Notes:</strong> {record.notes}
          </p>

          {Array.isArray(record.prescription) &&
            record.prescription.map((med, index) => (
              <div
                key={index}
                className="mt-2 p-2 bg-gray-100 rounded text-sm md:text-base"
              >
                <p><strong>{med.medicine}</strong></p>
                <p>{med.dosage} — {med.frequency}</p>
                <p>Duration: {med.duration}</p>
              </div>
            ))}

          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => generatePrescriptionPDF(record)}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition w-full sm:w-auto"
            >
              Download Prescription
            </button>

            {user?.role === "doctor" && (
              <>
                <button
                  onClick={() => handleEdit(record)}
                  className="bg-yellow-500 text-white px-3 py-2 rounded w-full sm:w-auto"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(record.id)}
                  className="bg-red-600 text-white px-3 py-2 rounded w-full sm:w-auto"
                >
                  Delete
                </button>
              </>
            )}
          </div>

          <p className="text-xs text-gray-500 mt-3">
            {new Date(record.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>

    {/* EDIT MODAL */}
    {editingRecord && (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4">
        <div className="bg-white p-4 md:p-6 rounded w-full max-w-md">
          <h2 className="text-base md:text-lg font-bold mb-3">
            Edit Record
          </h2>

          <input
            value={editingRecord.diagnosis || ""}
            onChange={(e) =>
              setEditingRecord({ ...editingRecord, diagnosis: e.target.value })
            }
            className="w-full border p-2 mb-2 rounded"
            placeholder="Diagnosis"
          />

          <input
            value={editingRecord.treatment || ""}
            onChange={(e) =>
              setEditingRecord({ ...editingRecord, treatment: e.target.value })
            }
            className="w-full border p-2 mb-2 rounded"
            placeholder="Treatment"
          />

          <textarea
            value={editingRecord.notes || ""}
            onChange={(e) =>
              setEditingRecord({ ...editingRecord, notes: e.target.value })
            }
            className="w-full border p-2 mb-2 rounded"
            placeholder="Notes"
          />

          <div className="flex flex-col sm:flex-row gap-2 mt-3">
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded w-full sm:w-auto"
            >
              Save
            </button>

            <button
              onClick={() => setEditingRecord(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded w-full sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default MedicalRecords;