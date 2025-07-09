import { IMAGE } from "@/constants/image";

import { Footer } from "../footer/Footer";
import styles from "./sidebar.module.scss";
import { UserProfile } from "./user-profile/UserProfile";

export const Sidebar = () => {
  return (
    <div className={styles["sidebar"]}>
      <UserProfile
        avatar={IMAGE.AVATAR}
        name="Rosalie"
        email="rosalie.rice@gmail.com"
      />
      <Footer />
    </div>
  );
};
