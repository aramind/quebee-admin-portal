const transformObj = (obj) => {
  return { subject: Object.values(obj).slice(0, -1).join(""), id: obj.id };
};
const transformDynamicFields = (array) => {
  return array.map((obj) => {
    if (obj) {
      transformObj(obj);
    }
  });
};

export default transformDynamicFields;
