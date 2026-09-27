import { createRoot } from 'react-dom/client';
import EditorApp from './EditorApp';

// Standalone dev preview only (http://localhost:3001). When the shell loads
// this remote it imports EditorApp directly and this file never runs.
const container = document.getElementById('root');
if (container) {
  createRoot(container).render(<EditorApp />);
}
