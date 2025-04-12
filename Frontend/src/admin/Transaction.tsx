import  { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { FiMenu, FiCheckCircle, FiXCircle, FiClock } from "react-icons/fi";
import AdminSidebar from "./AdminSidebar";
import "./Transaction.css";

const Transactions = () => {
  interface Transaction {
    id: string;
    name: string;
    email: string;
    amount: number;
    status: string;
    timestamp: {
      seconds: number;
    };
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch transactions from Firestore
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "payments"));
        const transactionsList = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            email: data.email,
            amount: data.amount,
            status: data.status,
            timestamp: data.timestamp,
          };
        });
        setTransactions(transactionsList);
      } catch (error) {
        console.error("Error fetching transactions: ", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className={`transactions-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
      {/* Sidebar Toggle Button */}
      <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <FiMenu />
      </button>

      {/* Sidebar */}
      {isSidebarOpen && <AdminSidebar onClose={() => setIsSidebarOpen(false)} />}

      <div className="transactions-content">
        <h1>Transactions</h1>
        <p>View all processed payments and their statuses.</p>

        {/* Transactions Table */}
        <div className="transactions-table">
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>{transaction.name}</td>
                    <td>{transaction.email}</td>
                    <td>KES {transaction.amount}</td>
                    <td className={`status ${transaction.status}`}>
                      {transaction.status === "Completed" && <FiCheckCircle className="status-icon success" />}
                      {transaction.status === "Pending" && <FiClock className="status-icon pending" />}
                      {transaction.status === "Failed" && <FiXCircle className="status-icon failed" />}
                      {transaction.status}
                    </td>
                    <td>{new Date(transaction.timestamp?.seconds * 1000).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="no-data">No transactions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
