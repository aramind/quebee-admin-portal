import { z } from "zod";
import constants from "../components/configs/constants";

const questionSchema = z.object({
  database: z.enum(constants.DATABASES),
  //   course: z.string().min(1, "Required"),
  courses: z.array(z.string()),
  subjects: z.array(z.string()),
  topics: z.array(z.string()),
  tags: z.array(z.string()),
  //   subjects: z.array(subjectsSchema),
  //   topics: z.array(topicSchema),
  //   keywords: z.array(keywordsSchema),
  //   code: z.string().min(1, "Required"),

  // difficulty: z.string().min(1, "Required"),
  difficulty: z.number().min(1, "Required"),
  type: z.string().min(1, "Required"),
  nature: z.string().min(1, "Required"),
  access: z.string().min(1, "Required"),
  question: z.string().min(1, "Required"),
  // A: z.string().min(1, "Required"),
  // B: z.string().min(1, "Required"),
  // C: z.string().min(1, "Required"),
  // D: z.string().min(1, "Required"),
  // correctAnswer: z.string().min(1, "Required"),
  choices: z.object({
    A: z.string().min(1, "Required"),
    B: z.string().min(1, "Required"),
    C: z.string().min(1, "Required"),
    D: z.string().min(1, "Required"),
    correctAnswer: z.string().min(1, "Required"),
  }),
  // topics: z.array(),
});

export default questionSchema;
