import { useEffect, useState } from "react";

import { CALENDAR_CONFIG } from "@/constants";

export const useNowLine = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(
      () => setNow(new Date()),
      CALENDAR_CONFIG.time.minutes * 1000,
    );
    return () => clearInterval(timer);
  }, []);

  const rowHeight = CALENDAR_CONFIG.grid.rowHeight;
  const currentMinutes =
    now.getHours() * CALENDAR_CONFIG.time.minutes + now.getMinutes();
  const offsetTop = currentMinutes * (rowHeight / CALENDAR_CONFIG.time.minutes);
  const lineTop = rowHeight + offsetTop;

  return { now, lineTop };
};
