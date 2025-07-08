import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { addDays, formatDayHeader, getStartOfWeek } from "@/helpers";

import { EventForm } from "../event-form/EventForm";
import styles from "./calendar-grid.module.scss";

export const CalendarGrid = ({
  view = "week",
  date = new Date(),
  startHour = 0,
  endHour = 23,
}) => {
  const [now, setNow] = useState(new Date());

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const rowHeight = 68;
  const offsetTop = currentMinutes * (rowHeight / 60);
  const lineTop = 68 + offsetTop;

  const hours = [];
  for (let h = startHour; h <= endHour; h++) {
    hours.push(h);
  }

  const days = [];

  if (view === "week") {
    const start = getStartOfWeek(date);
    for (let i = 0; i < 7; i++) {
      days.push(addDays(start, i));
    }
  } else {
    days.push(date);
  }

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={view === "day" ? `${styles.grid} ${styles.day}` : styles.grid}
    >
      <div className={styles["cell-header"]} />
      {days.map((day, i) => (
        <div key={i} className={styles["cell-header"]}>
          {formatDayHeader(day)}
        </div>
      ))}
      {hours.map((hour, row) => [
        <div key={`hour-${row}`} className={styles["cell-header"]}>
          {hour < 10 ? `0${hour}` : `${hour}`}
        </div>,
        ...days.map((day, col) => (
          <div key={`cell-${row}-${col}`} className={styles.cell}></div>
        )),
      ])}
      <div className={styles["now-line"]} style={{ top: `${lineTop}px` }}></div>
    </div>
  );
};

CalendarGrid.propTypes = {
  view: PropTypes.oneOf(["week", "day"]),
  date: PropTypes.instanceOf(Date),
  startHour: PropTypes.number,
  endHour: PropTypes.number,
};
