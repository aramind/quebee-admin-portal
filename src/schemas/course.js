import { z } from "zod";

const subjectSchema = z.object({
  shortTitle: z.string().min(1, "Required"),
  longTitle: z.string().min(1, "Required"),
  topics: z.array(),
});

const courseSchema = z.object({
  code: z.string().min(1, "Required"),
  acronym: z.string().min(1, "Required"),
  title: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  subjects: z.array(subjectSchema),
  // topics: z.array(),
});

export default courseSchema;
