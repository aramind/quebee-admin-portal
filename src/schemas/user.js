import { z } from "zod";
import constants from "../configs/constants";

const userSchema = z.object({
  // employeeId: z.string(),
  employeeId: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  firstName: z.string().min(1, "Required"),
  middleName: z.string(),
  username: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
  email: z.string().email().min(1, "Required"),
  role: z.enum(constants.ROLES),
  status: z.enum(constants.STATUS),
});

export default userSchema;
