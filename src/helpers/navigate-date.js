import { addDays } from "../utils/add-days";
import { getStartOfWeek } from "../utils/get-start-of-week";

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
