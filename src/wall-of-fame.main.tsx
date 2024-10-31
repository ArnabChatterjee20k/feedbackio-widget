import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { WallOfFameWidget } from './widget/Wall-of-fame.tsx'

createRoot(document.getElementById('feedbackio-feedback-widget')!).render(
  <StrictMode>
    <WallOfFameWidget projectId='6720788b0025006c6d47'/>
  </StrictMode>,
)
