import * as Yup from "yup";

const questionSchemaForBulkQuestions = Yup.object().shape({
  CODE: Yup.string().required("Code is required"),
  TOPICS: Yup.string().required("Topics are required"),
  ACCESS: Yup.number().required("Access is required").integer().positive(),
  DIFFICULTY: Yup.number()
    .required("Difficulty is required")
    .integer("Difficulty must be an integer")
    .min(1, "Difficulty must be at least 1")
    .max(5, "Difficulty must be at most 5"),
  TYPE: Yup.string().required("Type is required"),
  QUESTION_TEXT: Yup.string().required("Question text is required"),
  A_TEXT: Yup.string().required("Option A is required"),
  B_TEXT: Yup.string().required("Option B is required"),
  C_TEXT: Yup.string().required("Option C is required"),
  D_TEXT: Yup.string().required("Option D is required"),
  CORRECT_ANS: Yup.string()
    .required("Correct answer is required")
    .oneOf(["A", "B", "C", "D"], "Invalid correct answer"),
  INFO_TEXT: Yup.string(),
  SOURCES: Yup.string(),
  TAGS: Yup.string(),
  REMARKS: Yup.string(),
});

export default questionSchemaForBulkQuestions;
