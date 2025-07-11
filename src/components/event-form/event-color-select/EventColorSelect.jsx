import { useState } from "react";

import { EVENT_COLOR, IMAGE } from "@/constants";

import styles from "./event-color-select.module.scss";

export const EventColorSelect = ({ selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption =
    EVENT_COLOR.find((color) => color.id === selected?.id) || EVENT_COLOR[0];

  const handleOpenMenu = () => setIsOpen(!isOpen);

  const selectOption = (color) => {
    onSelect(color);
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
