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
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchBills();
    fetchPayments();

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

  const fetchPayments = async () => {
    try {
      const { data } = await api.get("/billing/payments");
      setPayments(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPatients = async () => {
    const { data } = await api.get("/patients");
    setPatients(data);
  };

  const handlePayment = async (bill) => {
    try {
      const { data } = await api.post("/billing/create-order", {
        amount: bill.total_amount
      });

      const options = {
        key: "rzp_test_SKrsjI8KyyKX7D",
        amount: data.amount,
        currency: "INR",
        order_id: data.id,
        handler: async function (response) {
          await api.post("/billing/verify-payment", {
            ...response,
            billing_id: bill.id
          });

          alert("Payment successful");
          fetchBills();
          fetchPayments();
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error(error);
      alert("Payment failed");
    }
  };

  const createInvoice = async () => {
    try {
      await api.post("/billing/invoice", {
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

  const downloadInvoice = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/billing/invoice/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download invoice");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

    } catch (error) {
      console.error(error);
      alert("Download failed");
    }
  };

  return (
    <div className="p-4 md:p-6">

      <h1 className="text-xl md:text-2xl font-bold mb-4 dark:text-white">Billing</h1>

      {/* ADMIN CREATE INVOICE */}
      {user?.role === "admin" && (
        <div className="border p-4 mb-6 rounded-lg bg-white shadow-sm space-y-3 max-w-full md:max-w-lg">

          <h2 className="font-bold">Create Invoice</h2>

          <select
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            className="w-full border p-2 rounded"
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
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <button
            onClick={createInvoice}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full md:w-auto"
          >
            Create Invoice
          </button>
        </div>
      )}

      {/* BILL LIST */}
      {bills.length === 0 ? (
        <p>No bills found</p>
      ) : (
        bills.map((bill) => (
          <div key={bill.id} className="border p-4 mb-4 rounded-lg bg-white shadow-sm">
            <p className="mb-1">Total: ₹{bill.total_amount}</p>
            <p className="mb-3">Status: {bill.status}</p>

            <div className="flex flex-col sm:flex-row gap-3">

              {bill.status === "pending" && user?.role === "patient" && (
                <button
                  onClick={() => handlePayment(bill)}
                  className="bg-green-600 text-white px-4 py-2 rounded w-full sm:w-auto"
                >
                  Pay Now
                </button>
              )}

              <button
                onClick={() => downloadInvoice(bill.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
              >
                Download Invoice
              </button>

            </div>
          </div>
        ))
      )}

      {/* PAYMENT HISTORY */}
      <h2 className="text-lg md:text-xl font-bold mt-6">Payment History</h2>

      {payments.length === 0 ? (
        <p>No payments yet</p>
      ) : (
        payments.map((p) => (
          <div key={p.id} className="border p-3 mt-2 rounded bg-white shadow-sm">
            <p>Invoice: {p.billing?.invoice_number}</p>
            <p>Method: {p.payment_method}</p>
            <p>Amount: ₹{p.paid_amount}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Billing;