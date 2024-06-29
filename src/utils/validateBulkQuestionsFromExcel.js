import questionSchemaForBulkQuestions from "../schemas/questionSchemaForBulkQuestions";

const validateBulkQuestionsFromExcel = async (data, code) => {
  try {
    await questionSchemaForBulkQuestions.validate(data, { abortEarly: false });
    return { isValid: true, errors: [] };
  } catch (error) {
    return {
      isValid: false,
      field: error.inner?.[0]?.path,
      error: error.inner?.[0]?.errors,
      code,
    };
  }
};

export default validateBulkQuestionsFromExcel;
