export const getStartMinutes = (timeRange) => {
  const [start] = timeRange.split("-");
  const [h, m] = start.split(":").map(Number);
  return h * 60 + m;
};
