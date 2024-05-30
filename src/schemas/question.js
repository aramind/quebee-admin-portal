import * as y from "yup";
// import { z } from "zod";

// const questionSchema = z.object({
//   code: z.string().min(1, "Required"),
//   access: z.number().min(1, "Required"),
//   difficulty: z.number().min(1, "Required"),
//   topics: z.array().optional(),
//   type: z.string().min(1, "Required"),
//   question: z.string().min(1, "Required"),
//   A: z.string().min(1, "Required"),
//   B: z.string().min(1, "Required"),
//   C: z.string().min(1, "Required"),
//   D: z.string().min(1, "Required"),
//   correctAnswer: z.string().min(1, "Required"),
//   information: z.string().optional(),
//   remarks: z.string(),
//   // tags: tagsArraySchema,
// });
const topicSchema = y.object({
  // Define properties for the topic object
  // Adjust properties as needed
  // For example:
  _id: y.string().required("Topic ID is required"),
  title: y.string().required("Topic title is required"),
});

const questionSchema = y.object().shape({
  code: y.string().required("Required"),
  access: y
    .number()
    .oneOf([1, 2, 3, 4, 5], "Invalid value")
    .required("Required"),
  difficulty: y
    .number()
    .oneOf([1, 2, 3, 4, 5], "Invalid value")
    .required("Required"),
  topics: y.array().of(topicSchema).min(1, "Required").required("Required"),
  type: y.string().required("Required"),
  question: y.string().required("Required"),
  A: y.string().required("Required"),
  B: y.string().required("Required"),
  C: y.string().required("Required"),
  D: y.string().required("Required"),
  correctAnswer: y.string().required("Required"),
  information: y.string().optional(),
  remarks: y.string().optional(),
  tags: y
    .array()
    .of(y.string().required("Required"))
    .min(1, "Required")
    .required("Required"),
});

export default questionSchema;
