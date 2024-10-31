import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import FeedbackButton from './widget/Feedback-Button.tsx'
const container = document.getElementById('feedbackio-feedback-widget')!
const getDatasetAttributes = (element: HTMLElement) => {
  return {
    spaceId: element.dataset.spaceid || '',
    spaceName: element.dataset.spaceName,
    spaceDescription: element.dataset.spaceDescription,
    spaceImage: element.dataset.spaceImage,
    butonText: element.dataset.butonText,
    authRedirect: element.dataset.authRedirect,
  };
};
const atributes = getDatasetAttributes(container)
createRoot(container).render(
  <StrictMode>
    <FeedbackButton {...atributes} />
  </StrictMode>,
)
