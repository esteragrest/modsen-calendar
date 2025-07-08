import { useState } from "react";

import { EVENT_COLOR } from "@/constants/event-color";
import { IMAGE } from "@/constants/image";

import styles from "./event-color-select.module.scss";

export const EventColorSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(EVENT_COLOR[0]);

  const handleOpenMenu = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (color) => {
    setSelectedOption(color);
    setIsOpen(false);
  };

  return (
    <div className={styles["event-color-select-container"]}>
      <div className={styles["select-button"]} onClick={handleOpenMenu}>
        <div
          className={styles["event-color"]}
          style={{ "--event-color": selectedOption.hex }}
        ></div>
        <i
          className={`${styles["select-icon"]} ${isOpen ? styles.active : ""}`}
        >
          <img src={IMAGE.SELECT_ICON} alt="select-icon" />
        </i>
      </div>
      {isOpen && (
        <div className={styles["options-container"]}>
          <ul className={styles.options}>
            {EVENT_COLOR.map((color) => (
              <li key={color.id} onClick={() => selectOption(color)}>
                {color.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
