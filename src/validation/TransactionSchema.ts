import zod from "zod";

const userIdSchema = zod.number();
const amountSchema = zod.number();
const contactIdSchema = zod.number();

export const TransactionSchema = zod.object({
  user_id: userIdSchema,
  receiver_id: contactIdSchema,
  amount: amountSchema,
}); 

