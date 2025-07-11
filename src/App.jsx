import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Modal } from "./components/modal/Modal";
import { MainPage } from "./pages/main-page/MainPage";

export const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <MainPage />
      <Modal />
    </DndProvider>
  );
};
