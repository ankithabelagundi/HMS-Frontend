import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Billing = () => {
  const { user } = useContext(AuthContext);

  const [bills, setBills] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetchBills();
    if (user?.role === "admin") {
      fetchPatients();
    }
  }, []);

  const fetchBills = async () => {
    try {
      const { data } = await api.get("/billing");
      setBills(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPatients = async () => {
    const { data } = await api.get("/patients");
    setPatients(data);
  };

  const createInvoice = async () => {
    try {
      await api.post("/billing/create", {
        patient_id: selectedPatient,
        items: [
          {
            description,
            amount: Number(amount)
          }
        ]
      });

      alert("Invoice created!");
      fetchBills();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Billing</h1>

      {/* ADMIN VIEW */}
      {user?.role === "admin" && (
        <div className="border p-4 mb-6">
          <h2 className="font-bold mb-2">Create Invoice</h2>

          <select
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
          >
            <option value="">Select Patient</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.users?.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button
            onClick={createInvoice}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create Invoice
          </button>
        </div>
      )}

      {/* BILL LIST (All roles) */}
      {bills.length === 0 ? (
        <p>No bills found</p>
      ) : (
        bills.map((bill) => (
          <div key={bill.id} className="border p-4 mb-4">
            <p>Total: ₹{bill.total_amount}</p>
            <p>Status: {bill.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Billing;