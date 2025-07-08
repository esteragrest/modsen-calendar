export const getStartOfWeek = (date, weekStartsOn = 1) => {
  const d = new Date(date);
  const day = (d.getDay() + 7 - weekStartsOn) % 7;
  d.setDate(d.getDate() - day);
  return d;
};
