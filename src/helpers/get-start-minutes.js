import { CALENDAR_CONFIG } from "@/constants";

export const getStartMinutes = (timeRange) => {
  const [start] = timeRange.split("-");
  const [h, m] = start.split(":").map(Number);
  return h * CALENDAR_CONFIG.time.minutes + m;
};
