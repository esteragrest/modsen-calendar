export function getPeriodLabel(view, periodDays, date) {
  if (view === "week") {
    const start = periodDays[0];
    const end = periodDays[6];
    const monthName = new Intl.DateTimeFormat("en", { month: "long" }).format(
      start,
    );

    const startDay = start.getDate();
    const endDay = end.getDate();
    const year = end.getFullYear();
    return `${monthName} ${startDay} – ${endDay}, ${year}`;
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
