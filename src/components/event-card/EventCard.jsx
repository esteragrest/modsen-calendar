import { CALENDAR_CONFIG } from "@/constants/calendar-config";
import { parseDate } from "@/helpers/parse-date";
import { parseTimeRange } from "@/helpers/parse-time-range";

import { Bridge } from "./bridge/Bridge";
import styles from "./event-card.module.scss";

export const EventCard = ({ event, view }) => {
  const rowHeight = CALENDAR_CONFIG.grid.rowHeight;
  const dayCount = view === "week" ? 7 : 1;
  const dayWidth = `calc((100% - ${rowHeight}px) / ${dayCount})`;
  const [eventStart, eventEnd] = event.time.split("-");

  const eventDate = parseDate(event.date);
  const [startMinute, endMinute] = parseTimeRange(event.time);

  let jsDay = eventDate.getDay();
  jsDay = jsDay === 0 ? 6 : jsDay - 1;
  const dayIndex = view === "week" ? jsDay : 0;

  const startOffset = startMinute - CALENDAR_CONFIG.time.startHour * 60;
  const top = rowHeight + startOffset * (rowHeight / 60);
  const height = (endMinute - startMinute) * (rowHeight / 60);

  return (
    <div
      className={styles["event-block"]}
      style={{
        top: `${top}px`,
        height: `${height}px`,
        left: `calc(${rowHeight}px + ${dayIndex} * ${dayWidth})`,
        width: dayWidth,
        backgroundColor: `${event.color.hex}0D`,
        border: `2px solid ${event.color.hex}`,
      }}
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
