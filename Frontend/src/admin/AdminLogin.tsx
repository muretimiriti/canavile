import React, { useState } from "react";
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [overrideCode, setOverrideCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetMode, setResetMode] = useState(false);
  const navigate = useNavigate();

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin/home");
    } catch {
      alert("Login failed. Please check your credentials.");
    }
  };

  // Handle password reset with override code
  const handleOverrideReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const overrideRef = collection(db, "AdminSettings");
      const q = query(overrideRef, where("type", "==", "overrideCode"));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const overrideData = querySnapshot.docs[0].data();
        if (overrideData.code === overrideCode) {
          if (auth.currentUser) {
            await updatePassword(auth.currentUser, newPassword);
            alert("Password updated successfully!");
            setResetMode(false);
          } else {
            alert("Admin not logged in. Please log in first.");
          }
        } else {
          alert("Invalid override code!");
        }
      } else {
        alert("Override code not found!");
      }
    } catch {
      alert("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      {!resetMode ? (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          <p onClick={() => setResetMode(true)}>Forgot Password?</p>
        </form>
      ) : (
        <form onSubmit={handleOverrideReset}>
          <input
            type="text"
            placeholder="Override Code"
            value={overrideCode}
            onChange={(e) => setOverrideCode(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
          <p onClick={() => setResetMode(false)}>Back to Login</p>
        </form>
      )}
    </div>
  );
};

export default AdminLogin;