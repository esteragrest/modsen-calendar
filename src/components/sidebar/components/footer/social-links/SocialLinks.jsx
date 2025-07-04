import { SocialLinksItem } from "./social-link-item/SocialLinkItem";
import { SOCIAL_LINKS } from "./social-links";
import styles from "./social-links.module.scss";

export const SocialLinks = () => {
  return (
    <div className={styles["social-links-container"]}>
      {SOCIAL_LINKS.map(({ name, icon }) => (
        <SocialLinksItem key={name} name={name} icon={icon} />
      ))}
    </div>
  );
};
