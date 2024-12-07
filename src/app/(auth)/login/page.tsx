"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignInPage: React.FC = ({ searchParams }: any) => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [callbackUrlPath, setCallbackUrlPath] = useState("/");
  const [showPassword, setShowPassword] = useState(false);
  const { push } = useRouter();

  const notCallbackUrl = ["/", "/login", "/seed"];

  useEffect(() => {
    const fullCallbackUrl = searchParams.callbackUrl || "/";
    setCallbackUrlPath(
      new URL(fullCallbackUrl, window.location.origin).pathname
    );
  }, [searchParams.callbackUrl]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: e.target.email.value,
        password: e.target.password.value,
        callbackUrlPath,
      });
      if (!res?.error) {
        if (notCallbackUrl.includes(callbackUrlPath)) {
          push("/maps");
        } else {
          push(callbackUrlPath);
        }
      } else {
        setIsLoading(false);
        setStatus("error");
        setError("Email atau password salah");
      }
    } catch (error: any) {
      setIsLoading(false);
      setStatus("error");
      setError("Terjadi kesalahan saat login");
    }
  };

  return (
    <div className="bg-[#F5F4F7] min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center mb-8">
        <div className="flex justify-center">
          <img src="/logo-explorenesia.png" alt="logo" width="140px" />
        </div>

        <h4 className="font-semibold text-2xl text-black">
          Masuk ke Akun Anda
        </h4>
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
              <div className="ml-3 font-normal">{error}</div>
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

          <form onSubmit={(e) => handleLogin(e)}>
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
            <div className="flex mt-4 items-start flex-col relative">
              <label
                htmlFor="password"
                className="text-primary font-semibold text-black text-xl"
              >
                Kata Sandi
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Masukkan Kata Sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-12 mt-2 border border-primary rounded-md py-2 px-4 pr-10 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary duration-500 text-black"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12m-4 0a4 4 0 108 0 4 4 0 10-8 0zM12 5.5a9 9 0 00-9 9M12 5.5a9 9 0 019 9"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825a9.99 9.99 0 01-1.875.175 9.99 9.99 0 01-9-9M12 5.5a9 9 0 019 9M15 12m-4 0a4 4 0 108 0 4 4 0 10-8 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3l18 18"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col mt-[40px] mb-2">
              <button
                disabled={isLoading}
                type="submit"
                className="w-full rounded-md mb-2 h-12 bg-orange-500 text-white py-1 px-4 hover:bg-orange-600 font-bold"
              >
                {isLoading ? "Loading..." : "Masuk"}
              </button>
            </div>
            <div className="flex justify-center">
              <Button
                onClick={handleBackClick}
                className=" bg-orange-500 text-white hover:bg-orange-600 w-[30%]"
              >
                &larr; Kembali
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
