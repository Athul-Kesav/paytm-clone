import Menubar from "@/components/Menubar";

export default function () {
  return (
    <>
      <div className="grid grid-cols-7 gap-3 h-screen w-screen p-4">
        <div className=" hidden col-span-1 p-4 rounded-lg md:flex md:flex-col md:justify-between border border-zinc-300">
          <Menubar />
        </div>
      </div>
    </>
  );
}
