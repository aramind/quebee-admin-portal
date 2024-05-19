const sortObjectsByProp = (objects, propName) => {
  const sorted =
    objects?.sort((a, b) => a[propName].localeCompare(b[propName])) || [];
  // console.log(sorted);
  return sorted;
};

export default sortObjectsByProp;
