import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(1, "Required"),
  username: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
  role: z.enum(["admin", "editor", "viewer"]),
});

export default userSchema;
