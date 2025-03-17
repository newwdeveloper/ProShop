import React, { useState } from "react";
import FormContainer from "../components/FormContainer.jsx";
import { Link } from "react-router-dom";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <FormContainer>
      <h2 className="mb-4 text-center text-2xl font-semibold text-gray-700">
        Login
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            className="w-full rounded border border-gray-300 p-2 outline-none focus:border-blue-500 focus:ring"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            className="w-full rounded border border-gray-300 p-2 outline-none focus:border-blue-500 focus:ring"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          Login
        </button>
      </form>

      {/* New User Link */}
      <div className="mt-4 text-center text-sm text-gray-600">
        New User?{" "}
        <Link to="/register" className="text-blue-500 hover:underline">
          Register Here
        </Link>
      </div>
    </FormContainer>
  );
};

export default LoginScreen;
