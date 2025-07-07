export const formatDayHeader = (date) => {
  const opts = { weekday: "long", day: "numeric" };
  return date.toLocaleDateString("en-GB", opts);
};
