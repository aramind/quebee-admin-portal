import { useCallback } from "react";

const useFormSubmit = (onSubmit) => {
  const handleSubmit = useCallback(
    async (formData) => {
      try {
        await onSubmit(formData);
      } catch (err) {}
    },
    [onSubmit]
  );

  return handleSubmit;
};

export default useFormSubmit;
