"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignUpPage: React.FC = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: e.target.fullname.value,
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        throw new Error(data.message || "Registration failed");
      }

      setStatus("success");
      setError(null);

      if (response.status === 200) {
        e.target.reset();
        push("/login");
      }
    } catch (error: any) {
      setStatus("error");
      setError(error.message);
    }
  };

  return (
    <div className="bg-[#F5F4F7] min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center mb-2">
        <div className="flex justify-center">
          <img src="/logo-ajhelen.png" alt="logo" width="140px" />
        </div>

        <h3 className="font-semibold text-2xl text-black">Buat Akun Baru</h3>
      </div>

      {/* Card Putih */}
      <div className="bg-white py-6 rounded-xl border-2 border-primary w-full md:w-8/12 lg:w-6/12 xl:w-4/12 mb-4">
        <div className="w-10/12 mx-auto">
          {status === "error" && (
            <div
              id="alert-2"
              className="flex p-4 mt-4 text-red-950 rounded-lg bg-red-300"
              role="alert"
            >
              <div className="ml-3 font-normal">
                {error || "Terjadi kesalahan, silakan coba lagi."}
              </div>
              <button
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8"
                aria-label="Close"
                onClick={() => {
                  setStatus(null);
                  setError(null);
                }}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          )}

          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex mt-4 items-start flex-col">
              <label
                htmlFor="fullname"
                className="text-primary font-semibold text-black text-xl"
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                placeholder="Masukkan Nama Lengkap"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
                className="w-full h-12 mt-2 border border-primary rounded-md py-2 px-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary duration-500 text-black"
              />
            </div>
            <div className="flex mt-4 items-start flex-col">
              <label
                htmlFor="email"
                className="text-primary font-semibold text-black text-xl"
              >
                Alamat Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Masukkan Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-12 mt-2 border border-primary rounded-md py-2 px-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary duration-500 text-black"
              />
            </div>
            <div className="flex mt-4 items-start flex-col">
              <label
                htmlFor="password"
                className="text-primary font-semibold text-black text-xl"
              >
                Kata Sandi
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Masukkan Kata Sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-12 mt-2 border border-primary rounded-md py-2 px-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary duration-500 text-black"
              />
            </div>
            <div className="flex mt-4 items-start flex-col">
              <label
                htmlFor="confirmPassword"
                className="text-primary font-semibold text-black text-xl"
              >
                Konfirmasi Kata Sandi
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Konfirmasi Kata Sandi"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full h-12 mt-2 border border-primary rounded-md py-2 px-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary duration-500 text-black"
              />
            </div>
            <div className="flex flex-col mt-5 mb-2">
              <button
                disabled={isLoading}
                type="submit"
                className="w-full rounded-md mb-2 h-12 bg-blue-800 text-white py-1 px-4 hover:bg-blue-800"
              >
                {isLoading ? "Loading..." : "Daftar"}
              </button>
              <div className="flex mt-3 items-center flex-row justify-center">
                <div className="flex mt-2 items-center flex-row justify-center">
                  <p className="text-xl mr-2 text-black">
                    Sudah memiliki akun?
                  </p>
                  <Link
                    href="/login"
                    className="text-blue-700 hover:text-blue-700"
                  >
                    Masuk
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;