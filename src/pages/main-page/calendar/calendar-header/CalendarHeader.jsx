import { useMemo } from "react";

import { CALENDAR_CONFIG, IMAGE } from "@/constants";
import {
  getNextDate,
  getPeriodDays,
  getPeriodLabel,
  getPreviousDate,
} from "@/helpers";

import { CalendarButton } from "../calendar-button/CalendarButton";
import styles from "./calendar-header.module.scss";

export const CalendarHeader = ({ view, date, setDate, setView }) => {
  const periodDays = useMemo(() => getPeriodDays(view, date), [view, date]);

  const periodLabel = useMemo(
    () => getPeriodLabel(view, periodDays, date),
    [view, periodDays, date],
  );

  const goToPrev = () => setDate((d) => getPreviousDate(view, d));
  const goToNext = () => setDate((d) => getNextDate(view, d));

  const goToToday = () => {
    setView(CALENDAR_CONFIG.viewMode.day);
    setDate(new Date());
  };

  return (
    <div className={styles["calendar-header"]}>
      <CalendarButton type="primary" onClick={goToToday}>
        Today
      </CalendarButton>
      <div className={styles.controls}>
        <CalendarButton type="arrow" onClick={goToPrev}>
          <img src={IMAGE.PREV_ARROW} alt="prev-arrow" />
        </CalendarButton>
        <p className={styles["period-label"]}>{periodLabel}</p>
        <CalendarButton type="arrow" onClick={goToNext}>
          <img src={IMAGE.NEXT_ARROW} alt="next-arrow" />
        </CalendarButton>
      </div>
      <div className={styles.actions}>
        <CalendarButton
          type="view-week"
          onClick={() => setView(CALENDAR_CONFIG.viewMode.week)}
          disabled={view === CALENDAR_CONFIG.viewMode.week}
        >
          Week
        </CalendarButton>
        <CalendarButton
          type="view-day"
          onClick={() => setView(CALENDAR_CONFIG.viewMode.day)}
          disabled={view === CALENDAR_CONFIG.viewMode.day}
        >
          Day
        </CalendarButton>
      </div>
    </div>
  );
};
