import PropTypes from "prop-types";

import styles from "./input-icon.module.scss";

export const InputIcon = ({ icon, name }) => {
  return (
    <div className={styles["input-icon"]}>
      <img src={icon} alt={name} />
    </div>
  );
};

InputIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
