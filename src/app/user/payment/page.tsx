"use client";

import { useEffect, useState } from "react";
import Menubar from "@/components/Menubar";
import AlertBox from "@/components/AlertBox";
import Button from "@/components/Button";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from "@/app/loading";

interface Contact {
  id: number;
  userName: string;
}

type AlertState =
  | {
      visible: boolean;
      text: string;
      type: "success" | "error" | "warning";
      onClick?: () => void; // `onClick` is required for these types
      onChange?: never; // `onChange` is not needed for these types
    }
  | {
      visible: boolean;
      text: string;
      type: "inputBox";
      onClick?: () => void; // `onClick` is required for inputBox
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // `onChange` is required for inputBox
    };

export default function ContactPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [amnt, setAmnt] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [pin, setPin] = useState<number>(0);
  const [pinConfirmed, setPinConfirmed] = useState(false); // Track if PIN is confirmed
  const [alert, setAlert] = useState<AlertState>({
    visible: false,
    text: "",
    type: "success", // default type
    onClick: () => {},
  });

  const showAlert = (
    text: string,
    type: "success" | "error" | "warning" | "inputBox",
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void // Optional parameter
  ) => {
    if (type === "inputBox") {
      if (!onChange) {
        throw new Error("onChange is required when type is 'inputBox'");
      }
      setAlert({ visible: true, text, type, onChange });
    } else {
      setAlert({ visible: true, text, type });
    }
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
        setLoading(false);
      } catch (error) {
        showAlert("Failed to fetch contacts!", "error", closeAlert);
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  async function sendMoney() {
    console.log("sending money"); // Debugging
    const balance = parseFloat(Cookies.get("balance") ?? "0");

    if (amnt > balance) {
      showAlert("Insufficient balance!", "error");
      return;
    }

    if (amnt <= 0) {
      showAlert("Invalid amount!", "error");
      return;
    }

    try {
      // Wait for the user to enter the PIN and confirm
      // Wait for PIN confirmation
      console.log("in the try block"); // Debugging
      //if (!pinConfirmed) return; // Abort if PIN wasn't confirmed
      console.log("pin confirmed"); // Debugging

      setLoading(true);
      console.log("loading"); // Debugging
      const userID = parseInt(Cookies.get("userID") ?? "0");

      const response = await axios.post("/api/user/transaction", {
        id: userID,
        amount: amnt,
        contactId: selectedContact?.id,
        pin: pin, // Use the confirmed PIN here
      });

      console.log("request sent"); // Debugging

      // Success alert
      showAlert(
        `₹${amnt} sent to ${selectedContact?.userName}!`,
        "success",
        closeAlert
      );
      Cookies.set("balance", (balance - amnt).toString());
    } catch (error: any) {
      // Error alert
      showAlert(
        error.response?.data?.message || "Transaction failed!",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="grid grid-cols-7 gap-3 h-screen w-screen p-4 overflow-hidden">
        {/* Sidebar */}
        <div className="hidden col-span-1 p-4 rounded-lg lg:flex md:flex-col md:justify-between border border-zinc-300">
          <Menubar />
        </div>

        {/* Contacts Section */}
        <div className="lg:col-span-2 col-span-3 h-full w-full rounded-lg md:flex flex-col p-7 overflow-y-auto hidden">
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
            {loading ? (
              // Case: Loading, regardless of whether there are contacts or not
              <Loading width="full" />
            ) : contacts.length === 0 ? (
              // Case: No contacts and not loading
              <div className="text-lg font-mono text-zinc-300">
                No contacts found
              </div>
            ) : (
              // Case: Contacts exist and not loading
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
        <div className=" md:col-span-4 col-span-full h-full w-auto rounded-lg p-4 flex flex-col align-middle border border-zinc-700">
          {selectedContact === null ? (
            <div className="text-3xl font-against">Transaction Details</div>
          ) : (
            <div className="grid grid-rows-7 w-full h-full grid-cols-2">
              <div className="row-span-1 col-span-2 p-4 flex ">
                <span className="text-2xl font-against md:text-3xl">
                  {selectedContact.userName}
                </span>
              </div>
              <div className="row-span-5 col-span-2 grid grid-rows-4 h-full w-auto mx-24 rounded-lg border-zinc-400 border p-7">
                <div className="row-span-1 h-full w-auto font-montserrat justify-center flex flex-col border-b-2 border-zinc-400">
                  <div className="text-green-300 text-md md:text-xl flex-col flex text-wrap">
                    Current Balance:
                    <span className="font-montserrat"> ₹ 
                    <span className="font-against">
                      {Cookies.get("balance")}
                    </span>
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
                    onClick={() => {
                      // Reset the PIN and confirmation state
                      setPin(0);
                      setPinConfirmed(false);

                      // Wait for the PIN confirmation

                      setAlert({
                        visible: true,
                        text: "Enter your PIN",
                        type: "inputBox",
                        onChange: (e) => setPin(parseInt(e.target.value) || 0),
                        onClick: () => {
                          setPinConfirmed(true); // Set confirmation state
                          closeAlert(); // Close alert box
                        },
                      });
                    }}
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
        <AlertBox
          text={alert.text}
          type={alert.type}
          onClick={() => {
            if (alert.type === "inputBox") {
              console.log("InputBox confirmed"); // Debugging
              console.log("PIN confirmed"); // Debugging
              sendMoney(); // Send money after PIN is confirmed
            } else {
              closeAlert();
            }
          }}
          onChange={(e) => {
            if (alert.type === "inputBox" && alert.onChange) {
              alert.onChange(e); // Handle input changes for inputBox
            }
          }}
        />
      )}

      {/* Loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-51">
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
          <Loading width="screen" />
        </div>
      )}
    </>
  );
}
