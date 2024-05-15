export const formatDate = (dateString, formatType = "short") => {
  const date = new Date(dateString);

  if (isNaN(date)) {
    return "Invalid Date";
  }

  switch (formatType) {
    case "short":
      const options = { month: "short", day: "2-digit", year: "numeric" };
      return date.toLocaleString("en-US", options);

    case "digit":
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;

    default:
      return date;
  }
};
