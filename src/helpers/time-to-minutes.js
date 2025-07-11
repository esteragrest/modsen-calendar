import { CALENDAR_CONFIG } from "@/constants";

export const timeToMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * CALENDAR_CONFIG.time.minutes + m;
};
