import { useState } from "react";

import { CalendarGrid } from "@/components/calendar-grid/CalendarGrid";

import styles from "./calendar.module.scss";
import { CalendarHeader } from "./calendar-header/CalendarHeader";

export const Calendar = () => {
  const [view, setView] = useState("week");
  const [date, setDate] = useState(new Date());

  return (
    <div className={styles["calendar-container"]}>
      <CalendarHeader
        view={view}
        date={date}
        setDate={setDate}
        setView={setView}
      />
      <CalendarGrid view={view} date={date} />
    </div>
  );
};
