import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { parseDate } from "@/helpers";
import { selectReloadFlag } from "@/store/selectors";
import { getVisibleDays } from "@/utils";

export function useWeekEvents(view, date) {
  const [events, setEvents] = useState([]);
  const reloadFlag = useSelector(selectReloadFlag);

  useEffect(() => {
    const eventsJSON = localStorage.getItem("events");
    if (!eventsJSON) return setEvents([]);

    const allUserEvents = JSON.parse(eventsJSON);
    const days = getVisibleDays(view, date);

    const startTs = days[0].setHours(0, 0, 0, 0);
    const endTs = days[days.length - 1].setHours(23, 59, 59, 999);

    const filteredEvents = allUserEvents.filter((event) => {
      const eventDate = parseDate(event.date).getTime();
      return eventDate >= startTs && eventDate <= endTs;
    });

    setEvents(filteredEvents);
  }, [view, date, reloadFlag]);

  return events;
}
