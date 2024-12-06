"use client";

import Button from "@/components/Button";
import Paycard from "@/components/Paycard";
//import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import electricity from "@/images/electricity.jpg";
import insurance from "@/images/insurance.jpg";
import gas from "@/images/gas.jpg";
import mobile from "@/images/mobile.jpg";
import ExpenseChart from "@/components/ExpenseChart";

interface User {
  email: string;
  password: string;
  userName: string;
  balance: number;
}

export default function () {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const makePayment = () => {
    router.push("/user/payment");
  };

  useEffect(() => {
    // Fetch user data
    const details = {
      email: "bronski@gmall.com",
      password: "password",
      userName: "bronski",
      balance: 1200.75,
    };
    setUser(details);
    // Update state with user data
  }, []);

  return (
    <>
      <div className="h-screen w-screen grid grid-cols-7 gap-3 p-4 text-zinc-300 overflow-auto">
        <div className=" hidden col-span-1 p-4 rounded-lg md:flex md:flex-col md:justify-between border border-zinc-300">
          <div className="flex flex-col">
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
              <span className="px-3">Bronski</span>
            </div>
            <div className="flex flex-col gap-1">
              <ul className="font-montserrat text-md text-zinc-300 gap-3 flex flex-col py-7">
                <li className="flex items-center py-2 gap-3 group hover:shadow-white-glow px-2 border border-black hover:border hover:border-white rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#d4d4d8"
                    className="size-6 text-zinc-300 group-hover:fill-zinc-300"
                  >
                    <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                    <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                  </svg>
                  <a href="#">Dashboard</a>
                </li>
                <li className="flex items-center py-2 gap-3 group hover:shadow-white-glow px-2 border border-black hover:border hover:border-white rounded-md">
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
                  <a href="#">Transactions</a>
                </li>
                <li className="flex items-center py-2 gap-3 group hover:shadow-white-glow px-2 border border-black hover:border hover:border-white rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#d4d4d8"
                    className="size-6 text-zinc-300 group-hover:fill-zinc-300"
                  >
                    <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                  </svg>
                  <a href="#">Settings</a>
                </li>
                <li className="flex items-center py-2 gap-3 group hover:shadow-white-glow px-2 border border-black hover:border hover:border-white rounded-md">
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
                  <a href="#">Logout</a>
                </li>
              </ul>
            </div>
          </div>
          <div></div>
        </div>
        <div className="h-full grid col-span-full md:col-span-6 grid-rows-5 gap-3">
          <div className="row-span-2 grid grid-cols-5 gap-3 ">
            <div className="col-span-full border border-zinc-300 md:p-7 sm:p-5 p-3 flex flex-col md:col-span-3 rounded-lg">
              <div className="h-fit mb-6 font-against text-3xl">
                Current Balance
              </div>
              <div className="h-full  flex flex-col px-2">
                <div className="font-against text-7xl py-2">
                  <span className="font-montserrat ">₹</span>
                  {user?.balance}
                </div>
                <div className="font-montserrat text-zinc-300 text-lg leading-tight my-2">
                  Last updated <br />
                  <span className="font-mono text-sm">3 minutes ago</span>
                </div>
                <div className="mt-5 flex  items-end">
                  <div className="items-center flex justify-between relative w-full">
                    <Button text="Make Payment" onClick={makePayment} />
                    <div className="cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="size-6 fill-current text-zinc-300 hover:text-white"
                      >
                        <path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z" />
                        <path
                          fillRule="evenodd"
                          d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="investments p-7 hidden md:flex md:flex-col md:col-span-2 border border-black hover:border-white rounded-lg hover:shadow-white-glow">
              <div className="h-fit  mb-6 font-against text-3xl">
                Investments
              </div>
              <div className="flex flex-col h-full ">
                <div className="flex justify-between items-center text-green-300">
                  <div className="font-against text-5xl ">
                    <span className="font-montserrat ">₹</span>
                    1000
                  </div>
                  <div className="font-montserrat text-2xl">+ 10%</div>
                </div>
                <div className="flex justify-between items-center text-lg text-red-300">
                  <div className="font-montserrat ">₹ 50.23</div>
                  <div className="font-montserrat">-5%</div>
                </div>
                <div className="font-montserrat text-zinc-300 text-lg leading-tight my-2">
                  Last updated <br />
                  <span className="font-mono text-sm">5 minutes ago</span>
                </div>
                <div className="align-bottom h-full items-end flex">
                  <Button
                    text="Invest Now"
                    onClick={makePayment}
                    width="full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" flex row-span-3 md:grid md:grid-cols-2 gap-3 ">
            <div className=" flex flex-col h-auto w-auto md:col-span-1 p-7 border border-zinc-300 rounded-lg">
              <div className="h-auto mb-6 font-against text-2xl">Quick Pay</div>
              <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-3">
                <div className="col-span-1 row-span-1 flex">
                  <Paycard
                    text="Electricity"
                    img={electricity}
                    onClick={makePayment}
                  />
                </div>
                <div className="col-span-1 row-span-1 flex">
                  <Paycard
                    text="Insurance"
                    img={insurance}
                    onClick={makePayment}
                  />
                </div>
                <div className="col-span-1 row-span-1 flex">
                  <Paycard text="LPG" img={gas} onClick={makePayment} />
                </div>
                <div className="col-span-1 row-span-1 flex">
                  <Paycard text="Recharge" img={mobile} onClick={makePayment} />
                </div>
              </div>
            </div>
            <div className=" flex flex-col h-full w-full md:col-span-1 p-7">
              <div className="h-[25rem] flex items-center justify-center  ">
                <ExpenseChart />
              </div>
              <div className="font-montserrat text-zinc-300 text-xs text-right">
                Maximum Expenditure on <br />
                <span className="font-bold font-mono text-2xl">Utilites</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
