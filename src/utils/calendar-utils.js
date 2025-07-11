export const addDays = (date, count) => {
  const d = new Date(date);
  d.setDate(d.getDate() + count);
  return d;
};

export const getStartOfWeek = (date, weekStartsOn = 1) => {
  const d = new Date(date);
  const day = (d.getDay() + 7 - weekStartsOn) % 7;
  d.setDate(d.getDate() - day);
  return d;
};

export const getVisibleDays = (view, date) => {
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
};
