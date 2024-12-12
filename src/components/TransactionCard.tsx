import { Transaction } from "@prisma/client";

type TransactionCardProps = Transaction & {
  user_id: number;
};

export default function TransactionCard(transaction: TransactionCardProps) {
  const { trans_id, amount, type, user_id, sender_id, receiver_id, trans_date } = transaction;

  //console.log(trans_date)
  return (
    <>
      <div className="w-2/3 h-full flex flex-col border border-zinc-700 rounded-lg p-3 px-5 hover:shadow-white-glow hover:border-white group transition-colors">
        <div className="flex justify-between items-center py-2">
          <span className="font-mono text-xs">Transaction ID: {trans_id}</span>
          <span className="font-mono text-xs">On: {}</span>
        </div>
        <div>
          <span className="font-montserrat text-2xl">Amount: ₹ </span>
          <span
            className={`font-against text-3xl ${
              user_id === receiver_id ? "text-green-200" : "text-red-200"
            }`}
          >
            {amount}
          </span>
        </div>
        <div className="flex flex-row-reverse group-hover:text-black group-hover:font-bold">
          <span className={`${
              user_id === receiver_id ? "bg-green-300" : "bg-red-300"
            } rounded-sm text-[#171717] font-montserrat text-xs w-fit p-2 `}>
            {type}
          </span>
        </div>
      </div>
    </>
  );
}
