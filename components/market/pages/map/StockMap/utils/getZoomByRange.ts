export const getZoomByRange = (range: number) => {
  if (range <= 500) {
    return 16;
  }

  if (range <= 1000) {
    return 15;
  }

  // if (range <= 2500) {
  //   return 14;
  // }

  if (range <= 2000) {
    return 14;
  }

  if (range <= 4500) {
    return 13;
  }

  if (range <= 9000) {
    return 12;
  }

  if (range <= 10000) {
    return 11;
  }

  if (range <= 35000) {
    return 10;
  }

  if (range <= 70000) {
    return 9;
  }

  if (range <= 150000) return 8;

  if (range <= 280000) return 7;

  return 6;
};
