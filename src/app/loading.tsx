

export default function Loading({width} : {width? : string}) {

  return (
    <div className={`flex w-${width? width : "screen"} h-screen items-center justify-center flex-col bg-[#171717]`}>
      <div className="relative w-16 h-16">
        {/* Inner Circle */}
        <div className="absolute w-10 h-10 border-4 border-t-transparent border-gray-200 rounded-full animate-spin-slow"></div>
      </div>
      <div className=" absolute top-2/3 font-light text-xl font-against text-zinc-300 mt-3 z-100">
        Loading...
      </div>
    </div>
  );
}