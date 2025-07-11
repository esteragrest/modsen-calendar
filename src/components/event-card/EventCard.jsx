import PropTypes from "prop-types";
import { useDrag } from "react-dnd";

import { CALENDAR_CONFIG } from "@/constants";
import { parseDate, parseTimeRange } from "@/helpers";

import { Bridge } from "./bridge/Bridge";
import styles from "./event-card.module.scss";

export const EventCard = ({ event, view, onClick }) => {
  const rowHeight = CALENDAR_CONFIG.grid.rowHeight;
  const dayCount = view === CALENDAR_CONFIG.viewMode.week ? 7 : 1;
  const dayWidth = `calc((100% - ${rowHeight}px) / ${dayCount})`;
  const [eventStart, eventEnd] = event.time.split("-");

  const eventDate = parseDate(event.date);
  const [startMinute, endMinute] = parseTimeRange(event.time);

  const jsDay = eventDate.getDay() === 0 ? 6 : eventDate.getDay() - 1;
  const dayIndex = view === CALENDAR_CONFIG.viewMode.week ? jsDay : 0;

  const startOffset =
    startMinute - CALENDAR_CONFIG.time.startHour * CALENDAR_CONFIG.time.minutes;
  const top =
    rowHeight + startOffset * (rowHeight / CALENDAR_CONFIG.time.minutes);
  const height =
    (endMinute - startMinute) * (rowHeight / CALENDAR_CONFIG.time.minutes);

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "EVENT",
    item: { id: event.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef}
      className={styles["event-block"]}
      style={{
        top: `${top}px`,
        height: `${height}px`,
        left: `calc(${rowHeight}px + ${dayIndex} * ${dayWidth})`,
        width: dayWidth,
        backgroundColor: `${event.color.hex}0D`,
        border: `2px solid ${event.color.hex}`,
        opacity: isDragging ? 0.6 : 1,
        cursor: "grab",
      }}
      onClick={onClick}
    >
      <div className={styles["event-time"]}>
        <Bridge bgColor={event.color.hex}>{eventStart}</Bridge>
        {eventStart !== eventEnd && (
          <Bridge bgColor={event.color.hex}>{eventEnd}</Bridge>
        )}
      </div>
      <p className={styles["event-title"]}>{event.name}</p>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.object.isRequired,
  view: PropTypes.oneOf(["week", "day"]).isRequired,
  onClick: PropTypes.func.isRequired,
};
