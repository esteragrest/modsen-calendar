import { CALENDAR_CONFIG } from "@/constants";

export const formatTimeRange = (startMinutes, duration) => {
  const format = (min) => {
    const h = Math.floor(min / CALENDAR_CONFIG.time.minutes);
    const m = min % CALENDAR_CONFIG.time.minutes;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };
  return `${format(startMinutes)}-${format(startMinutes + duration)}`;
};
