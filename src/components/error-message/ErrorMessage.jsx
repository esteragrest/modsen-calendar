import styles from "./error-message.module.scss";

export const ErrorMessage = ({ children }) => {
  return <p className={styles["error-message"]}>{children}</p>;
};
