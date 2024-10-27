import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import FeedbackButton from './widget/Feedback-Button.tsx'

createRoot(document.getElementById('feedbackio-feedback-widget')!).render(
  <StrictMode>
    <FeedbackButton spaceId='671a2e92000e7713cdea'/>
  </StrictMode>,
)
