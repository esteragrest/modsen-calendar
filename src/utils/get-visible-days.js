import { addDays } from "./add-days";
import { getStartOfWeek } from "./get-start-of-week";

export function getVisibleDays(view, date) {
  const days = [];

  if (view === "week") {
    const start = getStartOfWeek(date);
    for (let i = 0; i < 7; i++) {
      days.push(addDays(start, i));
    }
  } else {
    days.push(date);
  }

  return days;
}
