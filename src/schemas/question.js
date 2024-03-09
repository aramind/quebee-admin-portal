import { z } from "zod";
import constants from "../components/configs/constants";

const subjectsSchema = z.object({
  key: z.string().min(1, "Required"),
  name: z.string().min(1, "Required"),
});

const topicSchema = z.object({
  key: z.string().min(1, "Required"),
  name: z.string().min(1, "Required"),
});

const keywordsSchema = z.object({
  key: z.string().min(1, "Required"),
  name: z.string().min(1, "Required"),
});

const questionSchema = z.object({
  database: z.enum(constants.DATABASES),
  //   course: z.string().min(1, "Required"),
  courses: z.array(z.string()),
  //   subjects: z.array(subjectsSchema),
  //   topics: z.array(topicSchema),
  //   keywords: z.array(keywordsSchema),
  //   code: z.string().min(1, "Required"),

  //   difficulty: z.string().min(1, "Required"),
  //   type: z.string().min(1, "Required"),
  //   nature: z.string().min(1, "Required"),
  //   isPremium: z.boolean(),
  // topics: z.array(),
});

export default questionSchema;
