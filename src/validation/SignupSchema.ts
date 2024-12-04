import zod from "zod";

const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(8);
const userNameSchema = zod.string().min(3);

export const SignupSchema = zod.object({
  email: emailSchema,
  password: passwordSchema,
  userName: userNameSchema,
});