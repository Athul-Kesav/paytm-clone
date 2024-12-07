"use client";
import Menubar from "@/components/Menubar";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Button from "@/components/Button";
// Define the type of contact
interface Contact {
  id: number;
  userName: string;
}
export default function ContactPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [amnt, setAmnt] = useState<number>(0);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get<Contact[]>("/api/contacts");
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, []);

  function sendMoney() {
    //Check balance
    const balance = parseFloat(Cookies.get("balance") ?? "0");
    if (amnt > balance) {
      alert("Insufficient balance");
      return;
    }
    //Get Pin Confirmation
    const pin = prompt("Enter your pin");
    if (pin === null) {
      return;
    }
    //Send the money
    console.log("Sending money to", selectedContact?.userName, "Amount:", amnt);

  }

  return (
    <>
      <div className="grid grid-cols-7 gap-3 h-screen w-screen p-4 overflow-hidden">
        {/* Sidebar */}
        <div className="hidden col-span-1 p-4 rounded-lg md:flex md:flex-col md:justify-between border border-zinc-300">
          <Menubar />
        </div>

        {/* Contacts Section */}
        <div className=" col-span-2 h-full w-full rounded-lg flex flex-col p-7 overflow-hidden">
          <div className="text-4xl font-montserrat mb-4">Contacts</div>
          <div className="flex justify-between">
            <input
              type="text"
              placeholder="Search contacts"
              className="w-full p-2 rounded-md focus:outline-none bg-[#171717] text-zinc-300 font-mono placeholder:text-zinc-500"
            />
            <button className="p-2 bg-[#171717] rounded-md ml-2 group hover:bg-zinc-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                className="size-6 bg-[#171717] group-hover:stroke-[#171717] group-hover:bg-zinc-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-3 overflow-y-auto">
            {/* Display the contacts */}
            {contacts.length === 0 && (
              <div className="text-lg font-mono text-zinc-300">
                No contacts found
              </div>
            )}
            {contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className="flex justify-between items-center p-3 border-b border-zinc-300 cursor-pointer group"
              >
                <div className="flex items-center">
                  <div className="text-lg font-mono inline-flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#d4d4d8"
                      className="size-6 group-hover:fill-white"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="px-3 text-zinc-300 group-hover:text-white">
                      {contact.userName}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blue Section */}
        <div className=" col-span-4 h-full w-full rounded-lg p-4 flex flex-col align-middle border border-zinc-700">
          {selectedContact === null && (
            <div className="text-3xl font-against">
              Transaction <br />
              Details
            </div>
          )}
          {selectedContact !== null && (
            <div className="grid grid-rows-7 w-full h-full">
              <div className="row-span-1 p-4">
                <span className="text-3xl font-against">
                  {selectedContact.userName}
                </span>
              </div>
              <div className="row-span-5 grid grid-rows-4 h-full w-auto mx-24 rounded-lg border-zinc-400 border p-7">
                <div className="row-span-1 h-full w-auto font-montserrat justify-center flex flex-col border-b-2 border-zinc-400">
                  <div className="text-green-300">
                    Current Balance :
                    <span className="font-montserrat"> ₹ </span>
                    <span className="font-against">
                      {Cookies.get("balance")}
                    </span>
                  </div>
                </div>
                <div className="row-span-2 h-full w-auto font-montserrat justify-center flex flex-col items-center ">
                <span className="text-2xl font-against">Amount to send : </span>
                  <div>
                    <span className="font-montserrat">₹</span>
                    <span>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        className="bg-[#171717] text-red-300 font-mono p-2 rounded-md focus:outline-none mx-2"
                        value={isNaN(amnt) ? "" : amnt}
                        onChange={(e) => setAmnt(parseFloat(e.target.value))}
                      />
                    </span>
                  </div>
                </div>
                <div className="row-span-1 h-full w-auto font-montserrat justify-center flex py-8">
                  <Button text={`Send to ${selectedContact.userName}`} onClick={sendMoney} width="full"/>
                  </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
