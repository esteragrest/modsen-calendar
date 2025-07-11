import { CALENDAR_CONFIG } from "@/constants";

export const getDurationInMinutes = (timeRange) => {
  const [start, end] = timeRange.split("-").map((t) => {
    const [h, m] = t.split(":").map(Number);
    return h * CALENDAR_CONFIG.time.minutes + m;
  });
  return end - start;
};
