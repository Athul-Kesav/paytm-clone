"use client"

import AlertBox from "@/components/AlertBox";
import Menubar from "@/components/Menubar";

export default function () {

  function someFunction() { 
    console.log("Some function");
  }
  return (
    <>
      <div className="grid grid-cols-7 gap-3 h-screen w-screen p-4 ">
        <div className=" hidden col-span-1 p-4 rounded-lg md:flex md:flex-col md:justify-between border border-zinc-300">
          <Menubar />
        </div>
        <div className="col-span-3 flex w-full h-full rounded-lg p-3 ">
          <AlertBox text="Account updation failed" type="error" onClick={someFunction} />
        </div>
      </div>
    </>
  );
}
