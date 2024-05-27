import { z } from "zod";

const courseSchema = z.object({
  code: z.string().min(1, "Required"),
  title: z.string().min(1, "Required"),
  subjects: z.array(z.string()),
});

export default courseSchema;
