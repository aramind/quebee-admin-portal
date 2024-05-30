export const cleanData = (obj) => {
  const cleanedData = Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => {
      return value !== undefined && value !== null && value !== "";
    })
  );

  return cleanedData;
};
