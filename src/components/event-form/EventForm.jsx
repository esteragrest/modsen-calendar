import { IMAGE } from "@/constants/image";

import { EventColorSelect } from "./event-color-select/EventColorSelect";
import styles from "./event-form.module.scss";
import { EventFormButton } from "./event-form-button/EventFormButton";
import { EventInput } from "./event-input/EventInput";

export const EventForm = () => {
  return (
    <form className={styles["event-form-container"]}>
      <div className={styles["search-event-container"]}>
        <EventInput
          type="text"
          name="name"
          placeholder="Search Event..."
          border={false}
        />
        <EventColorSelect />
      </div>
      <EventInput
        type="text"
        name="location"
        placeholder="Location"
        border={true}
        icon={IMAGE.LOCATION_ICON}
      />
      <div className={styles["event-timing"]}>
        <EventInput
          type="text"
          name="date"
          placeholder="Add Date"
          border={true}
          icon={IMAGE.DATE_ICON}
        />
        <EventInput
          type="text"
          name="time"
          placeholder="Add Time"
          border={true}
          icon={IMAGE.CLOCK}
        />
      </div>
      <EventInput
        type="text"
        name="notes"
        placeholder="Add Notes"
        border={true}
        icon={IMAGE.NOTES_ICON}
      />
      <EventFormButton onClick={() => {}} type="save">
        Save
      </EventFormButton>
    </form>
  );
};
