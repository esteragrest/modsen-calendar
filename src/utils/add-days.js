export const addDays = (date, count) => {
  const d = new Date(date);
  d.setDate(d.getDate() + count);
  return d;
};
