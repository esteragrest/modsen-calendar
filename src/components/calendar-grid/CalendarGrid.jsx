import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { CALENDAR_CONFIG } from "@/constants";
import {
  formatDate,
  formatDayHeader,
  formatTimeRange,
  getDurationInMinutes,
  getStartMinutes,
} from "@/helpers";
import { useNowLine, useWeekEvents } from "@/hooks";
import { UPDATE_RELOAD_FLAG } from "@/store/actions";
import { getVisibleDays, updateEventList } from "@/utils";

import { EventCard } from "../event-card/EventCard";
import { EventForm } from "../event-form/EventForm";
import styles from "./calendar-grid.module.scss";
import { DroppableCell } from "./droppable-cell/DroppableCell";

export const CalendarGrid = ({
  view = CALENDAR_CONFIG.viewMode.week,
  date = new Date(),
}) => {
  const [menu, setMenu] = useState({ pos: null, event: null });
  const events = useWeekEvents(view, date);
  const days = getVisibleDays(view, date);
  const dispatch = useDispatch();

  const { startHour, endHour } = CALENDAR_CONFIG.time;
  const { lineTop } = useNowLine();

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
    const minuteOffset = originalStart % CALENDAR_CONFIG.time.minutes;

    const newStart = hour * CALENDAR_CONFIG.time.minutes + minuteOffset;
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
      className={
        view === CALENDAR_CONFIG.viewMode.day
          ? `${styles.grid} ${styles.day}`
          : styles.grid
      }
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
      <div className={styles["now-line"]} style={{ top: `${lineTop}px` }} />
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
