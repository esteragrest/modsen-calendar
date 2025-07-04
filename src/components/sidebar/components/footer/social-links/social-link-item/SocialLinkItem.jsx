import PropTypes from "prop-types";

import styles from "./social-link-item.module.scss";

export const SocialLinksItem = ({ name, icon }) => {
  return (
    <div className={styles["social-link-item"]}>
      <img src={icon} alt={name} />
    </div>
  );
};

SocialLinksItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};
