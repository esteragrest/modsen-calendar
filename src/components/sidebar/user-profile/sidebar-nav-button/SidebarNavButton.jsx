import { IMAGE } from "@/constants/image";

import styles from "./sidebar-nav-button.module.scss";

export const SidebarNavButton = () => {
  return (
    <div className={styles["sidebar-nav-button-container"]}>
      <div className={styles.status}></div>
      <div className={styles.calendars}>
        <img src={IMAGE.CALENDAR} alt="" />
        <p>Calendars</p>
      </div>
    </div>
  );
};
