import "./Paycard.css";
import Image, { StaticImageData } from "next/image";
interface PaycardProps {
  text: string;
  img: StaticImageData | string;
  onClick: () => void;
}

export default function ({ text, img, onClick }: PaycardProps) {
  return (
    <>
      <div className="flex flex-col bg-zinc-300 h-auto w-auto">
        <div>
          <Image
            src={img}
            alt="cardImg"
            layout="responsive"
            width={16} // Defines the aspect ratio
            height={9} // Defines the aspect ratio
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="font-montserrat text-xl">{text}</div>
      </div>
    </>
  );
}
