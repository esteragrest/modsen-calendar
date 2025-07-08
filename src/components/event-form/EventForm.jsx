import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { EVENT_COLOR } from "@/constants/event-color";
import { DATE_RE, MAX_LENGTH, TIME_RE } from "@/constants/event-validation";
import { IMAGE } from "@/constants/image";
import { UPDATE_RELOAD_FLAG } from "@/store/actions/update-reload-flag";

import { EventColorSelect } from "./event-color-select/EventColorSelect";
import styles from "./event-form.module.scss";
import { EventFormButton } from "./event-form-button/EventFormButton";
import { EventInput } from "./event-input/EventInput";

export const EventForm = ({ coords }) => {
  const [form, setForm] = useState({
    name: "",
    location: "",
    date: "",
    time: "",
    notes: "",
    color: EVENT_COLOR[0],
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorSelect = (color) => {
    setForm((prev) => ({ ...prev, color }));
  };

  useEffect(() => {
    const newErrors = {};

    for (const key of ["name", "location", "date", "time"]) {
      const val = form[key].trim();
      if (!val) {
        newErrors[key] = "Обязательное поле";
      } else if (val.length > MAX_LENGTH) {
        newErrors[key] = `Максимум ${MAX_LENGTH} символов`;
      }
    }

    if (form.date && !DATE_RE.test(form.date.trim())) {
      newErrors.date = "Формат: ДД.ММ.ГГГГ.";
    }

    if (form.time && !TIME_RE.test(form.time.trim())) {
      newErrors.time = "Формат: ЧЧ:ММ-ЧЧ:ММ";
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [form]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;

    const eventsJSON = localStorage.getItem("events");
    const events = eventsJSON ? JSON.parse(eventsJSON) : [];

    localStorage.setItem("events", JSON.stringify([...events, form]));

    dispatch(UPDATE_RELOAD_FLAG);
    setForm({
      name: "",
      location: "",
      date: "",
      time: "",
      notes: "",
      color: EVENT_COLOR[0],
    });
  };

  return (
    <form
      className={styles["event-form-container"]}
      style={coords}
      onSubmit={handleSubmit}
    >
      <div className={styles["search-event-container"]}>
        <EventInput
          type="text"
          name="name"
          placeholder="Search Event..."
          border={false}
          value={form.name}
          setValue={handleChange}
        />
        <EventColorSelect selected={form.color} onSelect={handleColorSelect} />
      </div>
      <EventInput
        type="text"
        name="location"
        placeholder="Location"
        border={true}
        icon={IMAGE.LOCATION_ICON}
        value={form.location}
        setValue={handleChange}
        error={errors.location}
      />

      <div className={styles["event-timing"]}>
        <EventInput
          type="text"
          name="date"
          placeholder="Add Date"
          border={true}
          icon={IMAGE.DATE_ICON}
          value={form.date}
          setValue={handleChange}
          error={errors.date}
        />
        <EventInput
          type="text"
          name="time"
          placeholder="Add Time"
          border={true}
          icon={IMAGE.CLOCK}
          value={form.time}
          setValue={handleChange}
          error={errors.time}
        />
      </div>
      <EventInput
        type="text"
        name="notes"
        placeholder="Add Notes"
        border={true}
        icon={IMAGE.NOTES_ICON}
        value={form.notes}
        setValue={handleChange}
        error={errors.notes}
      />

      <EventFormButton onClick={handleSubmit} type="save" disabled={!isValid}>
        Save
      </EventFormButton>
    </form>
  );
};
