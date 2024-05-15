export const formatCreatorName = (nameObj) => {
  if (!nameObj?.name) {
    return "Unknown";
  } else {
    const lastName = nameObj?.name?.lastName;
    const formattedLastName =
      lastName[0].toUpperCase() + lastName.slice(1) || "";
    const firstName = nameObj?.name?.firstName;
    const middleName = nameObj?.name?.middleName;
    const firstInitial = firstName ? firstName[0].toUpperCase() + "." : "";
    const middleInitial = middleName ? middleName[0].toUpperCase() + "." : "";

    return `${formattedLastName}, ${firstInitial}${middleInitial}`;
  }
};
