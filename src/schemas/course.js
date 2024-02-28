import { z } from "zod";

const subjectSchema = z.object({
  shortTitle: z.string().min(1, "Required"),
  longTitle: z.string().min(1, "Required"),
  topics: z
    .string()
    .refine((value) => /^(?=.*#)(?=.*[a-zA-Z]{3,})/.test(value), {
      message: "Invalid Entries",
    }),
});

const courseSchema = z.object({
  database: z.string().min(1, "Required"),
  code: z.string().min(1, "Required"),
  acronym: z.string().min(1, "Required"),
  title: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  subjects: z.array(subjectSchema),
  // topics: z.array(),
});

export default courseSchema;
