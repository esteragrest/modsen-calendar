import { IMAGE } from "@/constants";

import styles from "./sidebar-about.module.scss";

export const SidebarAbout = () => {
  return (
    <div className={styles["sidebar-about-container"]}>
      <div className={styles["logo-container"]}>
        <img src={IMAGE.LOGO} alt="logotype" />
      </div>
      <p>
        We have clothes that suits your style and which you’re proud to wear.
        From women to men.
      </p>
    </div>
  );
};
