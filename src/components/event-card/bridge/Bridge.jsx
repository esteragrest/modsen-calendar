import PropTypes from "prop-types";

import styles from "./bridge.module.scss";

export const Bridge = ({ bgColor, children }) => {
  return (
    <div
      className={styles.bridge}
      style={{
        backgroundColor: `${bgColor}`,
      }}
    >
      {children}
    </div>
  );
};

Bridge.propTypes = {
  bgColor: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};
