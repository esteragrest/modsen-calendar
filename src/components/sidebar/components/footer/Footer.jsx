import styles from "./footer.module.scss";
import { SidebarAbout } from "./sidebar-about/SidebarAbout";
import { SocialLinks } from "./social-links/SocialLinks";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <SidebarAbout />
      <SocialLinks />
    </footer>
  );
};
