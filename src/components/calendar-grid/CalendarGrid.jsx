import PropTypes from "prop-types";

import styles from "./calendar-grid.module.scss";
import { addDays, formatDayHeader, getStartOfWeek } from "./utils";

export const CalendarGrid = ({
  view = "week",
  date = new Date(),
  startHour = 9,
  endHour = 20,
}) => {
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
          {`${hour}:00`}
        </div>,
        ...days.map((day, col) => (
          <div key={`cell-${row}-${col}`} className={styles.cell} />
        )),
      ])}
    </div>
  );
};

CalendarGrid.propTypes = {
  view: PropTypes.oneOf(["week", "day"]),
  date: PropTypes.instanceOf(Date),
  startHour: PropTypes.number,
  endHour: PropTypes.number,
};
