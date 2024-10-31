import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { WallOfFameWidget } from "./widget/Wall-of-fame.tsx";
const getDatasetAttributes = (element: HTMLElement) => {
  return {
    projectId: element.dataset.spaceid || "",
  };
};
const container = document.getElementById("feedbackio-wall-of-fame")!;
const attributes = getDatasetAttributes(container);
createRoot(container).render(
  <StrictMode>
    <WallOfFameWidget {...attributes} />
  </StrictMode>
);
