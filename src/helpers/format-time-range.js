export const formatTimeRange = (startMinutes, duration) => {
  const format = (min) => {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };
  return `${format(startMinutes)}-${format(startMinutes + duration)}`;
};
