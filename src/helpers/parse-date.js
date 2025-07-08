export const parseDate = (date) => {
  const [day, mounth, year] = date.split(".").map(Number);
  return new Date(year, mounth - 1, day);
};
