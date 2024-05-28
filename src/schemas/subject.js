import { z } from "zod";

const subjectSchema = z.object({
  code: z.string().min(1, "Required"),
  title: z.string().min(1, "Required"),
});

export default subjectSchema;
