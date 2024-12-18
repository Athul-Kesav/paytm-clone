"use client";

import axios from "axios";
import Cookies from "js-cookie";
import AlertBox from "./AlertBox";
import { useEffect, useState } from "react";

export default function () {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const username = Cookies.get("username");
    const decodedUser = decodeURIComponent(username || ""); // Decode URL-encoded string
    const cleanUsername = decodedUser.replace(/^"|"$/g, ""); // Remove surrounding quotes
    setUsername(cleanUsername);
  }, []);

  const [alert, setAlert] = useState({
    visible: false,
    text: "",
    type: "error" as "success" | "error" | "warning" | "inputBox",
    onClick: () => {},
  });

  const showAlert = (
    text: string,
    type: "success" | "error" | "warning" | "inputBox",
    onClick: () => {}
  ) => {
    setAlert({ visible: true, text, type, onClick: onClick });
  };

  /* const closeAlert = () => {
    setAlert({ ...alert, visible: false });
  }; */

  function logout() {
    axios.post("/api/user/logout");
    Cookies.remove("userName");
    Cookies.remove("id");
    Cookies.remove("balance");
  }

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="font-against text-2xl text-zinc-300 inline-flex items-center py-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#d4d4d8"
            className="size-8 text-zinc-300 group-hover:fill-zinc-300"
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="px-3 hidden lg:block">{username.split(" ")[0]}</span>
        </div>
        <div className="flex flex-col gap-1">
          <ul className="font-montserrat text-md text-zinc-300 gap-3 flex flex-col py-7">
            <li
              onClick={() => {
                window.location.href = "/user/dashboard";
                console.log(Cookies.get("userName"));
              }}
              className="flex items-center py-2 gap-3 group hover:shadow-white-glow px-2 border border-[#171717] hover:border hover:border-white rounded-md cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#d4d4d8"
                className="size-6 text-zinc-300 group-hover:fill-zinc-300"
              >
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
              <a className="hidden lg:block">Dashboard</a>
            </li>
            <li
              onClick={() => {
                window.location.href = "/user/payment";
              }}
              className="flex items-center py-2 gap-3 group hover:shadow-white-glow px-2 border border-[#171717] hover:border hover:border-white rounded-md cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#d4d4d8"
                className="size-6 text-zinc-300 group-hover:fill-zinc-300"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM9 7.5A.75.75 0 0 0 9 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 0 0 9 12h3.622a2.251 2.251 0 0 1-2.122 1.5H9a.75.75 0 0 0-.53 1.28l3 3a.75.75 0 1 0 1.06-1.06L10.8 14.988A3.752 3.752 0 0 0 14.175 12H15a.75.75 0 0 0 0-1.5h-.825A3.733 3.733 0 0 0 13.5 9H15a.75.75 0 0 0 0-1.5H9Z"
                  clipRule="evenodd"
                />
              </svg>
              <a className="hidden lg:block">Payments</a>
            </li>
            <li
              onClick={() => {
                window.location.href = "/user/transactions";
              }}
              className="flex items-center py-2 gap-3 group hover:shadow-white-glow px-2 border border-[#171717] hover:border hover:border-white rounded-md cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                />
              </svg>
              <a className="hidden lg:block">Transactions</a>
            </li>
            <li
              onClick={() => {
                window.location.href = "/user/settings";
              }}
              className="flex items-center py-2 gap-3 group hover:shadow-white-glow px-2 border border-[#171717] hover:border hover:border-white rounded-md cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#d4d4d8"
                className="size-6 text-zinc-300 group-hover:fill-zinc-300"
              >
                <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
              </svg>
              <a className="hidden lg:block">Settings</a>
            </li>
            <li
              onClick={() => {
                showAlert("Logged out successfully", "warning", () => {
                  return (window.location.href = "/login");
                });
                logout();
              }}
              className="flex items-center py-2 gap-3 group hover:shadow-white-glow px-2 border border-[#171717] hover:border hover:border-white rounded-md cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#d4d4d8"
                className="size-6 text-zinc-300 group-hover:fill-zinc-300"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM6.166 5.106a.75.75 0 0 1 0 1.06 8.25 8.25 0 1 0 11.668 0 .75.75 0 1 1 1.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 0 1 1.06 0Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="hidden lg:block">Logout</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="font-mono text-lg hover:text-black hover:bg-zinc-300 text-center rounded-lg py-1 cursor-pointer hover:shadow-white-glow">
        Go Premium
      </div>

      {/* AlertBox */}
      {alert.visible && (
        <AlertBox
          text={alert.text}
          type={alert.type}
          onClick={alert.onClick}
          onChange={() => {}}
        />
      )}
    </>
  );
}
