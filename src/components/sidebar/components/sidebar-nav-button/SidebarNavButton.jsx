import styles from "./sidebar-nav-button.module.scss";

export const SidebarNavButton = () => {
  return (
    <div className={styles["sidebar-nav-button-container"]}>
      <div className={styles.status}></div>
      <div className={styles.calendars}>
        <img src="/public/img/calendar.svg" alt="" />
        <p>Calendars</p>
      </div>
    </div>
  );
};
