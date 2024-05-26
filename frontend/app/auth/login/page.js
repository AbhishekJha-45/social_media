"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function login() {
  const [username, setUsername] = useState("abhishek45");
  const [password, setPassword] = useState("12345678");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const isEmail = username.includes("@");

    try {
      const data = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        isEmail ? { email: username, password } : { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const res = await data.data;
      if (res.status === 200) {
        router.push("/");
        window.localStorage.setItem("isUserAuthenticated", res.status === 200);
      } else {
        setSuccess(false);
      }
      setLoading(false);
    } catch (error) {
      setError(error.response?.data.message);
      setLoading(false);
    }
  };

  return (
    <main className="bg-purple-950 text-white min-h-[100vh] h-full flex justify-center items-center overflow-hidden">
      <div className="bg-purple-600 mmin-h-[80vh]  pt-3 min-w-72 rounded-md">
        <div className="flex flex-col justify-evenly  gap-y-5">
          <h1 className="mt-10 text-xl text-white font-semibold text-center">
            Login / Signup
          </h1>
          <form
            className="flex flex-col text-white items-center
             justify-center  gap-y-5 py-8 lg:py-3"
            onSubmit={handleSubmit}
            method="POST"
          >
            <label htmlFor="username">Username / Email</label>
            <input
              type="text"
              autoComplete="on"
              className="px-3  py-2 text-black"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              autoComplete="on"
              className="px-3 py-2 text-black"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-5 py-2 rounded-sm"
              disabled={loading}
            >
              {loading ? "Validating ..." : "Login"}
              {/*Show "Loading..." during loading state*/}
            </button>
            {error && <div className="text-red-500 text-center">{error}</div>}
            {/* Display error message */}
            {success && (
              <div className="text-green-600 text-center">
                Login successful!
              </div>
            )}
            {/* Display success message */}
          </form>
        </div>
      </div>
    </main>
  );
}
