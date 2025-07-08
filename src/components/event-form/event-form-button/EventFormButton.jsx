import PropTypes from "prop-types";

import styles from "./event-form-button.module.scss";

export const EventFormButton = ({ onClick, type, children }) => {
  return (
    <button
      className={`${styles["event-form-button"]} ${styles[type]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

EventFormButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["save", "delete"]).isRequired,
  children: PropTypes.string.isRequired,
};
