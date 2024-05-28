import { useCallback } from "react";

const useFormSubmit = (onSubmit) => {
  const handleSubmit = useCallback(
    async (formData) => {
      try {
        console.log("Submitting form data:", formData);
        await onSubmit(formData);
      } catch (err) {
        console.error("Error submitting form:", err);
        alert("ERROR", err);
      }
    },
    [onSubmit]
  );

  return handleSubmit;
};

export default useFormSubmit;
