"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isClient, setIsClient] = useState(false); // Track whether we're on the client
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Ensure the component is mounted on the client
  }, []);

  function login() {
    router.push('/login');
  }

  function signup() {
    router.push('/signup');
  }

  if (!isClient) {
    return null; // Render nothing until the component is mounted
  }

  return (
    <div className="flex w-screen h-screen items-center justify-center flex-col bg-black">
      <div className="font-light text-5xl font-against">Welcome to Pay-Tee-Yem</div>
      <div className="flex justify-between text-black font-montserrat">
      <button
              className="bg-zinc-300 font-montserrat px-5 py-2 rounded-lg m-7 border-black border-2 text-black text-lg hover:bg-white"
              onClick={login}
            >
              Login
            </button>
        <button
              className="bg-zinc-300 font-montserrat px-5 py-2 rounded-lg m-7 border-black border-2 text-black text-lg hover:bg-white"
              onClick={signup}
            >
              Signup
            </button>
      </div>
    </div>
  );
}
