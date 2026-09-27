import { createRoot } from 'react-dom/client';
import TemplatesApp from './TemplatesApp';

// Standalone dev preview only (http://localhost:3002). When the shell loads
// this remote it imports TemplatesApp directly and this file never runs.
const container = document.getElementById('root');
if (container) {
  createRoot(container).render(<TemplatesApp />);
}
