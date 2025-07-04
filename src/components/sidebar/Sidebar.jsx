import { UserProfile } from "./components/user-profile/UserProfile";
import styles from "./sidebar.module.scss";

export const Sidebar = () => {
  return (
    <div className={styles["sidebar"]}>
      <UserProfile
        avatar="/public/img/avatar.svg"
        name="Rosalie"
        email="rosalie.rice@gmail.com"
      />
    </div>
  );
};
