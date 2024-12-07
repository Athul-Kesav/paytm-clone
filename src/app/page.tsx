"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function Home() {
  const [isClient, setIsClient] = useState(false); // Track whether we're on the client
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Ensure the component is mounted on the client
  }, []);

  function login() {
    router.push("/login");
  }

  function signup() {
    router.push("/signup");
  }

  if (!isClient) {
    return null; // Render nothing until the component is mounted
  }

  return (
    <div className="flex w-screen h-screen items-center justify-center flex-col bg-black">
      <div className="font-light text-5xl font-against">
        Welcome to Pay-Tee-Yem
      </div>
      <div className="flex justify-between text-black font-montserrat ">
        <span className="m-5 hover:shadow-white-glow rounded-lg">
          <Button text="Login" onClick={login} />
        </span>
        <span className="m-5 hover:shadow-white-glow rounded-lg">
          <Button text="Signup" onClick={signup} />
        </span>
      </div>
    </div>
  );
}
