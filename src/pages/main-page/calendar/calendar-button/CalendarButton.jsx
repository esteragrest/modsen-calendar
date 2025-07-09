import PropTypes from "prop-types";

import styles from "./calendar-button.module.scss";

export const CalendarButton = ({
  type = "primary",
  onClick,
  disabled = false,
  children,
}) => {
  return (
    <button
      className={`${styles["calendar-button"]} ${styles[`calendar-button--${type}`]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

CalendarButton.propTypes = {
  type: PropTypes.oneOf(["primary, arrow, view-week, view-day"]),
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
