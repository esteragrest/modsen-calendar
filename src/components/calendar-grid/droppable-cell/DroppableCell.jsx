import { useDrop } from "react-dnd";

import styles from "./droppable-cell.module.scss";

export const DroppableCell = ({ day, hour, onDrop, onClick }) => {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "EVENT",
    drop: (item, monitor) => onDrop(item, monitor, day, hour),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={dropRef}
      className={`${styles.cell} ${isOver ? styles.over : ""}`}
      onClick={onClick}
    />
  );
};
