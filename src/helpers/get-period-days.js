import { addDays } from "../utils/add-days";
import { getStartOfWeek } from "../utils/get-start-of-week";

export const getPeriodDays = (view, date) => {
  if (view === "week") {
    const start = getStartOfWeek(date);
    const days = [];

    for (let i = 0; i < 7; i++) {
      days.push(addDays(start, i));
    }

    return days;
  }

  return [date];
};
