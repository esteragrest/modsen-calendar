import PropTypes from "prop-types";

import { SidebarNavButton } from "./sidebar-nav-button/SidebarNavButton";
import styles from "./user-profile.module.scss";

export const UserProfile = ({ avatar, name, email }) => {
  return (
    <div className={styles["user-profile-container"]}>
      <div className={styles["avatar-container"]}>
        <div className={styles["avatar"]}>
          <img src={avatar} alt={`${name}`} />
        </div>
      </div>
      <div className={styles["user-info"]}>
        <p className={styles.name}>Hello {name}</p>
        <p className={styles.email}>{email}</p>
      </div>
      <SidebarNavButton />
    </div>
  );
};

UserProfile.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
