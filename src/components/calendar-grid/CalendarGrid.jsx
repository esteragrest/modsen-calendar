import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { CALENDAR_CONFIG } from "@/constants/calendar-config";
import { formatDayHeader } from "@/helpers";
import { formatDate } from "@/helpers/format-date";
import { formatTimeRange } from "@/helpers/format-time-range";
import { getDurationInMinutes } from "@/helpers/get-duration-in-minutes";
import { getStartMinutes } from "@/helpers/get-start-minutes";
import { useWeekEvents } from "@/hooks/use-week-events";
import { UPDATE_RELOAD_FLAG } from "@/store/actions/update-reload-flag";
import { getVisibleDays } from "@/utils/get-visible-days";
import { updateEventList } from "@/utils/update-event-list";

import { EventCard } from "../event-card/EventCard";
import { EventForm } from "../event-form/EventForm";
import styles from "./calendar-grid.module.scss";
import { DroppableCell } from "./droppable-cell/DroppableCell";

export const CalendarGrid = ({ view = "week", date = new Date() }) => {
  const [now, setNow] = useState(new Date());
  const [menu, setMenu] = useState({ pos: null, event: null });
  const events = useWeekEvents(view, date);
  const days = getVisibleDays(view, date);
  const { startHour, endHour } = CALENDAR_CONFIG.time;
  const dispatch = useDispatch();

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

  const handleDrop = (item, monitor, day, hour) => {
    const allEvents = JSON.parse(localStorage.getItem("events")) || [];
    const originalEvent = allEvents.find((ev) => ev.id === item.id);
    if (!originalEvent) return;

    const duration = getDurationInMinutes(originalEvent.time);
    const originalStart = getStartMinutes(originalEvent.time);
    const minuteOffset = originalStart % 60;

    const newStart = hour * 60 + minuteOffset;
    const newDate = formatDate(day);
    const newTime = formatTimeRange(newStart, duration);

    const updatedEvent = {
      ...originalEvent,
      date: newDate,
      time: newTime,
    };

    updateEventList(updatedEvent, originalEvent);
    dispatch(UPDATE_RELOAD_FLAG);
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
          {formatDayHeader(day)}
        </div>
      ))}
      {hours.map((hour, row) => [
        <div key={`hour-${row}`} className={styles["cell-header"]}>
          {hour.toString().padStart(2, "0")}
        </div>,
        ...days.map((day, col) => (
          <DroppableCell
            key={`cell-${row}-${col}`}
            day={day}
            hour={hour}
            onDrop={handleDrop}
            onClick={handleCellClick}
          />
        )),
      ])}
      <div className={styles["now-line"]} style={{ top: `${lineTop}px` }}></div>
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          view={view}
          onClick={(e) => handleEventClick(e, event)}
        />
      ))}
      {menu.pos && (
        <EventForm
          coords={{ left: menu.pos.x, top: menu.pos.y }}
          event={menu.event}
          onCloseForm={() => setMenu({ pos: null, event: null })}
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
