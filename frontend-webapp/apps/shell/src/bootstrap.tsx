import { createRoot } from 'react-dom/client';
import { App } from './App';
import '@resumex/ui/tokens.css';
import '@resumex/ui/tailwind.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container "#root" was not found in index.html');
}
createRoot(container).render(<App />);
