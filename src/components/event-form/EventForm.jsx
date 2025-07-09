import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { IMAGE } from "@/constants/image";
import { initialFormState } from "@/constants/initial-event-form-state";
import { openModal } from "@/store/actions/open-modal";
import { UPDATE_RELOAD_FLAG } from "@/store/actions/update-reload-flag";
import { updateEventList } from "@/utils/update-event-list";
import { eventFormValidation } from "@/validations/event-form-validation";

import { ErrorMessage } from "../error-message/ErrorMessage";
import { EventColorSelect } from "./event-color-select/EventColorSelect";
import styles from "./event-form.module.scss";
import { EventFormButton } from "./event-form-button/EventFormButton";
import { EventInput } from "./event-input/EventInput";

export const EventForm = ({ coords, event, onCloseForm }) => {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (event) {
      setForm(event);
    }
  }, [event]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorSelect = (color) => {
    setForm((prev) => ({ ...prev, color }));
  };

  useEffect(() => {
    const newErrors = eventFormValidation(form);

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [form]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    updateEventList(form, event);

    dispatch(UPDATE_RELOAD_FLAG);
    setForm(initialFormState);
    onCloseForm();
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
        />
        <EventInput
          type="text"
          name="time"
          placeholder="Add Time"
          border={true}
          icon={IMAGE.CLOCK}
          value={form.time}
          setValue={handleChange}
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
      />
      {Object.keys(errors).length > 0 && (
        <ErrorMessage>{Object.values(errors)[0]}</ErrorMessage>
      )}
      <div className={styles["event-form-buttons"]}>
        <EventFormButton onClick={handleSubmit} type="save" disabled={!isValid}>
          Save
        </EventFormButton>
        {event && (
          <EventFormButton
            onClick={() => dispatch(openModal(event.id))}
            type="delete"
          >
            Delete
          </EventFormButton>
        )}
      </div>
    </form>
  );
};

EventForm.propTypes = {
  coords: PropTypes.object.isRequired,
  event: PropTypes.object,
  onCloseForm: PropTypes.func.isRequired,
};
