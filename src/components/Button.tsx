interface ButtonProps {
  text: string;
  width?: string; // Optional width prop
  onClick: () => void;
}

export default function Button({ text, width, onClick }: ButtonProps) {
  return (
    <>
      <button
        className={`bg-zinc-300 font-montserrat px-5 py-2 rounded-lg border-black border-2 text-black text-lg hover:bg-white ${
          width ? `w-${width}` : "w-fit"
        }`}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
}
