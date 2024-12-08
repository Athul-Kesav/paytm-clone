"use client";

import { useEffect, useState } from "react";
import Menubar from "@/components/Menubar";
import AlertBox from "@/components/AlertBox";
import Button from "@/components/Button";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { parse } from "path";

interface Contact {
  id: number;
  userName: string;
}

export default function ContactPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [amnt, setAmnt] = useState<number>(0);
  const [alert, setAlert] = useState({
    visible: false,
    text: "",
    type: "error" as "success" | "error" | "warning" | "inputBox",
  });

  const showAlert = (text: string, type: "success" | "error" | "warning") => {
    setAlert({ visible: true, text, type });
  };

  const closeAlert = () => {
    setAlert({ ...alert, visible: false });
  };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.post<Contact[]>("/api/contacts", {
          data: {
            id: Cookies.get("userID"),
          },
        });
        setContacts(response.data);
      } catch (error) {
        showAlert("Failed to fetch contacts!", "error");
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  async function sendMoney() {
    const balance = parseFloat(Cookies.get("balance") ?? "0");

    if (amnt > balance) {
      showAlert("Insufficient balance!", "error");
      return;
    }

    const pinPrompt = prompt("Enter your pin");
    if (!pinPrompt) return;
    const pin = parseInt(pinPrompt);
    //Check if pin is correct and make transaction
    const userID = parseInt(Cookies.get("userID") ?? "0");
    try{
      const response = await axios
      .post("/api/user/transaction", {
        id: userID,
        amount: amnt,
        contactId: selectedContact?.id,
        pin: pin,
      })
      .then(() => {
        showAlert(`₹${amnt} sent to ${selectedContact?.userName}!`, "success");
        Cookies.set("balance", (balance - amnt).toString());
      })
    }catch(error: any){
      showAlert(error.response.data.message, "error");
      return;
    }
    //showAlert(response.data.message, "success");

    console.log("Sent money to", selectedContact?.userName, "Amount:", amnt);
  }

  return (
    <>
      <div className="grid grid-cols-7 gap-3 h-screen w-screen p-4 overflow-hidden">
        {/* Sidebar */}
        <div className="hidden col-span-1 p-4 rounded-lg md:flex md:flex-col md:justify-between border border-zinc-300">
          <Menubar />
        </div>

        {/* Contacts Section */}
        <div className="col-span-2 h-full w-full rounded-lg flex flex-col p-7 overflow-hidden">
          <div className="text-4xl font-montserrat mb-4">Contacts</div>
          <div className="flex justify-between mb-4">
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
            {contacts.length === 0 ? (
              <div className="text-lg font-mono text-zinc-300">
                No contacts found
              </div>
            ) : (
              contacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className="flex justify-between items-center p-3 border-b border-zinc-300 cursor-pointer group"
                >
                  <div className="flex items-center">
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
              ))
            )}
          </div>
        </div>

        {/* Transaction Section */}
        <div className="col-span-4 h-full w-full rounded-lg p-4 flex flex-col align-middle border border-zinc-700">
          {selectedContact === null ? (
            <div className="text-3xl font-against">Transaction Details</div>
          ) : (
            <div className="grid grid-rows-7 w-full h-full">
              <div className="row-span-1 p-4">
                <span className="text-3xl font-against">
                  {selectedContact.userName}
                </span>
              </div>
              <div className="row-span-5 grid grid-rows-4 h-full w-auto mx-24 rounded-lg border-zinc-400 border p-7">
                <div className="row-span-1 h-full w-auto font-montserrat justify-center flex flex-col border-b-2 border-zinc-400">
                  <div className="text-green-300 text-xl">
                    Current Balance:
                    <span className="font-montserrat text-xl"> ₹ </span>
                    <span className="font-against text-xl">
                      {Cookies.get("balance")}
                    </span>
                  </div>
                </div>
                <div className="row-span-2 h-full w-auto font-montserrat justify-center flex flex-col items-center">
                  <span className="text-2xl font-against">Amount to send:</span>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="bg-[#171717] text-red-300 font-mono p-2 rounded-md focus:outline-none mx-2 text-xl"
                    value={isNaN(amnt) ? "" : amnt}
                    onChange={(e) => setAmnt(parseFloat(e.target.value))}
                  />
                </div>
                <div className="row-span-1 h-full w-auto font-montserrat justify-center flex py-8">
                  <Button
                    text={`Send to ${selectedContact.userName}`}
                    onClick={sendMoney}
                    width="full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AlertBox */}
      {alert.visible && (
        <AlertBox text={alert.text} type={alert.type} onClick={closeAlert} />
      )}
    </>
  );
}
