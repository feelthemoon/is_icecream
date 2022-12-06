export const useDiff = (initObj: any, diffObj: any) => {
  return Object.keys(diffObj).reduce((diff, key) => {
    if (initObj[key] === diffObj[key]) return diff;
    return {
      ...diff,
      [key]: diffObj[key],
    };
  }, {});
};
