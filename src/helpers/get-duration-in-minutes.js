export const getDurationInMinutes = (timeRange) => {
  const [start, end] = timeRange.split("-").map((t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  });
  return end - start;
};
