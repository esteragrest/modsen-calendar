import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { CALENDAR_CONFIG } from "@/constants/calendar-config";
import { useWeekEvents } from "@/hooks/use-week-events";
import { getVisibleDays } from "@/utils/get-visible-days";

import { EventCard } from "../event-card/EventCard";
import { EventForm } from "../event-form/EventForm";
import styles from "./calendar-grid.module.scss";

export const CalendarGrid = ({ view = "week", date = new Date() }) => {
  const [now, setNow] = useState(new Date());
  const [menu, setMenu] = useState({ pos: null, event: null });
  const events = useWeekEvents(view, date);
  const days = getVisibleDays(view, date);
  const { startHour, endHour } = CALENDAR_CONFIG.time;

  const rowHeight = CALENDAR_CONFIG.grid.rowHeight;
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const offsetTop = currentMinutes * (rowHeight / 60);
  const lineTop = rowHeight + offsetTop;

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCellClick = (event) => {
    event.stopPropagation();
    setMenu((prev) => ({
      pos: prev.pos ? null : { x: event.clientX, y: event.clientY },
      event: null,
    }));
  };

  const handleEventClick = (e, event) => {
    e.stopPropagation();
    setMenu({
      pos: { x: e.clientX, y: e.clientY },
      event: event,
    });
  };

  const hours = [];
  for (let h = startHour; h <= endHour; h++) {
    hours.push(h);
  }

  return (
    <div
      className={view === "day" ? `${styles.grid} ${styles.day}` : styles.grid}
    >
      <div className={styles["cell-header"]} />
      {days.map((day, i) => (
        <div key={i} className={styles["cell-header"]}>
          {day.toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
          })}
        </div>
      ))}
      {hours.map((hour, row) => [
        <div key={`hour-${row}`} className={styles["cell-header"]}>
          {hour.toString().padStart(2, "0")}
        </div>,
        ...days.map((_, col) => (
          <div
            key={`cell-${row}-${col}`}
            className={styles.cell}
            onClick={handleCellClick}
          ></div>
        )),
      ])}
      <div className={styles["now-line"]} style={{ top: `${lineTop}px` }}></div>
      {events.map((event, index) => {
        return (
          <EventCard
            key={index}
            event={event}
            view={view}
            onClick={(e) => handleEventClick(e, event)}
          />
        );
      })}
      {menu.pos && (
        <EventForm
          coords={{ left: menu.pos.x, top: menu.pos.y }}
          event={menu.event}
        />
      )}
    </div>
  );
};

CalendarGrid.propTypes = {
  view: PropTypes.oneOf(["week", "day"]),
  date: PropTypes.instanceOf(Date),
  startHour: PropTypes.number,
  endHour: PropTypes.number,
};
