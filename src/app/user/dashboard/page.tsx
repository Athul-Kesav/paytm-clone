"use client";

import Button from "@/components/Button";
import Paycard from "@/components/Paycard";
//import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import electricity from "@/images/electricity.jpg";

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
        <div className=" hidden col-span-1 bg-yellow-300 rounded-lg md:block"></div>
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
            <div className="investments p-7 hidden md:flex md:flex-col md:col-span-2 border border-black hover:border-white rounded-lg">
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
          <div className=" flex row-span-3 bg-blue-300 md:grid md:grid-cols-2 gap-3">
            <div className=" flex flex-col h-auto w-auto md:col-span-1 bg-red-300 p-7">
                <div className="h-auto mb-6 font-against text-2xl bg-black">
                    Quick Pay
                </div>
                <div className="grid grid-cols-2 grid-rows-2">
                    
                </div>
            </div>
            <div className=" flex flex-col h-auto w-auto md:col-span-1 bg-zinc-300"></div>
          </div>
        </div>
      </div>
    </>
  );
}
