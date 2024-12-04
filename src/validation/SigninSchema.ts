import zod from "zod"; 

const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(8);

export const SigninSchema = zod.object({
    email: emailSchema,
    password: passwordSchema,
});
