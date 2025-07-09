export const updateEventList = (form, event) => {
  const eventsJSON = localStorage.getItem("events");
  const events = eventsJSON ? JSON.parse(eventsJSON) : [];

  const updated = event
    ? events.map((item) =>
        item.id === event.id ? { ...form, id: event.id } : item,
      )
    : [...events, { ...form, id: Date.now() }];

  localStorage.setItem("events", JSON.stringify(updated));
};
