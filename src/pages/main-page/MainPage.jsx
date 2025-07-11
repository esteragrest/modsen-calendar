import { Header, Sidebar } from "@/components";

import { Calendar } from "./calendar/Calendar";
import styles from "./main-page.module.scss";

export const MainPage = () => {
  return (
    <>
      <Header />
      <main className={styles["main-page-container"]}>
        <Sidebar />
        <Calendar />
      </main>
    </>
  );
};
