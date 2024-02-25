import { z } from "zod";

const zodLoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export default zodLoginSchema;
