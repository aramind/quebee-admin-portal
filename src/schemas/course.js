import { z } from "zod";

const courseSchema = z.object({
  database: z.string().optional(),
  code: z.string().min(1, "Required"),
  acronym: z.string().optional(),
  title: z.string().min(1, "Required"),
  description: z.string().optional(),
  subjects: z.array(z.string()).optional(),
  remarks: z.string().optional(),
});

export default courseSchema;
