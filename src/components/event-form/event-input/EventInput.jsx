import PropTypes from "prop-types";

import { InputIcon } from "../input-icon/InputIcon";
import styles from "./event-input.module.scss";

export const EventInput = ({
  type,
  name,
  placeholder,
  border,
  icon,
  value,
  setValue,
  ...props
}) => {
  return (
    <div
      className={
        border
          ? `${styles["event-input-container"]} ${styles.border}`
          : styles["event-input-container"]
      }
    >
      {icon && <InputIcon icon={icon} name={name} />}
      <input
        className={styles["event-input"]}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={setValue}
        {...props}
      />
    </div>
  );
};

EventInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  border: PropTypes.bool,
  icon: PropTypes.string,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};
