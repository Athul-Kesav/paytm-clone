import Image, { StaticImageData } from "next/image";
import "./Paycard.css";

interface PaycardProps {
  text: string;
  img: StaticImageData | string;
  onClick: () => void;
}

export default function Paycard({ text, img, onClick }: PaycardProps) {
  return (
    <>
      <div className="group flex flex-col  w-full h-full rounded-lg overflow-hidden gap-1 hover:text-zinc-300 hover:bg-black cursor-pointer">
        {/* Parent div must have relative positioning */}
        <div className="relative w-full h-3/4">
          <Image
            src={img}
            alt="cardImg"
            layout="fill" // Ensures the image fills the container
            objectFit="cover" // Scales the image to cover the container without distortion
            objectPosition="center" // Centers the image
            className="grayscale contrast-125"
          />
        </div>
        <div className="hover:bg-zinc-300 font-montserrat text-xl p-2 text-center hover:text-black group-hover:text-black group-hover:bg-zinc-300 rounded-b-lg">{text}</div>
      </div>
    </>
  );
}
