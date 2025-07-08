import { addDays } from "./add-days";
import { getStartOfWeek } from "./get-start-of-week";

export function getPreviousDate(view, date) {
  return view === "week"
    ? addDays(getStartOfWeek(date), -7)
    : addDays(date, -1);
}

export function getNextDate(view, date) {
  return view === "week"
    ? addDays(getStartOfWeek(date), +7)
    : addDays(date, +1);
}
