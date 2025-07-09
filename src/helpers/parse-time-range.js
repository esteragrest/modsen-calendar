import { timeToMinutes } from "./time-to-minutes";

export const parseTimeRange = (range) => {
  const [start, end] = range.split("-");
  return [timeToMinutes(start), timeToMinutes(end)];
};
