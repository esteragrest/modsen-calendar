import { useDispatch, useSelector } from "react-redux";

import { IMAGE } from "@/constants";
import { CLOSE_MODAL, UPDATE_RELOAD_FLAG } from "@/store/actions";
import { selectModal } from "@/store/selectors";

import styles from "./modal.module.scss";

export const Modal = () => {
  const { isOpen, eventIdToDelete } = useSelector(selectModal);
  const dispatch = useDispatch();

  if (!isOpen) {
    return null;
  }

  const handleDeleteEvent = () => {
    const eventsJSON = localStorage.getItem("events");
    const events = JSON.parse(eventsJSON);

    const filteredEvents = events.filter(
      (eventsItem) => eventsItem.id !== eventIdToDelete,
    );

    localStorage.setItem("events", JSON.stringify(filteredEvents));

    dispatch(UPDATE_RELOAD_FLAG);
    dispatch(CLOSE_MODAL);
  };

  const closeModal = () => {
    dispatch(CLOSE_MODAL);
  };

  return (
    <div className={styles["modal-container"]}>
      <div className={styles.overlay}></div>
      <div className={styles["modal-content"]}>
        <div className={styles["close-modal"]} onClick={closeModal}>
          <img src={IMAGE.CROSS} alt="cross" />
        </div>
        <div className={styles["check-mark"]}>
          <img src={IMAGE.CHECK_MARK} alt="chek-mark" />
        </div>
        <div className={styles.warning}>
          <p className={styles.question}>
            Are you sure you want to delete the event?
          </p>
          <p className={styles.description}>
            If an event is deleted, it will need to be created again.
          </p>
        </div>
        <div className={styles["modal-buttons"]}>
          <button className={styles.cancel} onClick={closeModal}>
            Cancel
          </button>
          <button className={styles.confirm} onClick={handleDeleteEvent}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
