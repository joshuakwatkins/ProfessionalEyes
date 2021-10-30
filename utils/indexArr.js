const indexOfAll = (arr, val) =>
  arr.reduce(
    (acc, el, i) => (el.toLowerCase() === val ? [...acc, i] : acc),
    []
  );

module.exports = indexOfAll;
