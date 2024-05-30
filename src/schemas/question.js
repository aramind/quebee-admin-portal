import { z } from "zod";
const questionSchema = z.object({
  code: z.string().min(1, "Required"),
  access: z.number().min(1, "Required"),
  difficulty: z.number().min(1, "Required"),
  topics: z.array().optional(),
  type: z.string().min(1, "Required"),
  question: z.string().min(1, "Required"),
  A: z.string().min(1, "Required"),
  B: z.string().min(1, "Required"),
  C: z.string().min(1, "Required"),
  D: z.string().min(1, "Required"),
  correctAnswer: z.string().min(1, "Required"),
  information: z.string().optional(),
  tags: z.array(z.string()),
  remarks: z.string(),
});

export default questionSchema;
