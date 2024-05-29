export const isSaveBtnDisabled = (errors, dirtyFields) => {
  return (
    Object.keys(errors).length !== 0 ||
    !dirtyFields?.code ||
    !dirtyFields?.title
  );
};
