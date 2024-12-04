"use client";

import { useState } from "react";
import Image from "next/image";
import SignupPic from "@/images/SignupPic.jpg"; // Importing Heroicons for exclamation mark

export default function Signup() {
  // State to track input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // To store error message

  // Handle password match check
  const passwordMismatch = password !== confirmPassword;

  // Handle signup form submission
  function signup() {
    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return; // Stop further execution if passwords don't match
    }

    setError(""); // Clear any previous error
    console.log("Signup successful");
    // Proceed with the signup process (e.g., API call)
  }

  return (
    <>
      <div className="grid grid-cols-2 w-screen h-screen p-4 gap-4">
        <div className="col-span-1 relative w-full h-full">
          <Image
            src={SignupPic}
            alt="Signup Image"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="rounded-lg"
          />
        </div>
        <div className="col-span-1 w-full h-full rounded-lg flex flex-col items-center justify-center">
          <div className="font-against text-2xl text-center text-zinc-300">
            Signup
          </div>
          <div className="flex flex-col w-1/2 text-zinc-300 font-montserrat gap-3">
            <span>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded-lg focus:outline-none text-mono focus:text-black font-montserrat focus:bg-zinc-300 bg-black focus:border-2 border-zinc-300 text-zinc-300 focus:border-black border"
              />
            </span>
            <span>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded-lg focus:outline-none text-mono focus:text-black font-montserrat focus:bg-zinc-300 bg-black focus:border-2 border-zinc-300 text-zinc-300 focus:border-black border"
              />
            </span>
            <span className="relative">
              Confirm Password
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full p-2 rounded-lg focus:outline-none text-mono focus:text-black font-montserrat focus:bg-zinc-300 bg-black focus:border-2 border-zinc-300 text-zinc-300 focus:border-black border ${passwordMismatch ? 'border-red-500' : ''}`}
              />
              {passwordMismatch && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-6 absolute right-2 top-1/2">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
              </svg>
              )}
            </span>
            {error && (
              <div className="text-red-500 text-sm">{error}</div> // Display error message
            )}
            <span className="text-right">
              <a
                href="#"
                className="text-gray-400 text-center hover:text-white"
              >
                Forgot Password?
              </a>
            </span>
          </div>
          <div>
            <button
              className="bg-zinc-300 font-montserrat px-5 py-2 rounded-lg m-7 border-black border-2 text-black text-lg hover:bg-white"
              onClick={signup}
            >
              Let's Go
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
