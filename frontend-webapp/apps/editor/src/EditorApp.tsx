import { useResumeStore } from './model/resumeStore';
// Imported here (not bootstrap.tsx) so the CSS ships with the federated module the shell actually loads.
import '@resumex/ui/tokens.css';
import '@resumex/ui/tailwind.css';

// This is the ONLY file exposed via Module Federation (see exposes.
// './EditorApp' in rspack.config.mjs). index.ts/bootstrap.tsx above are for
// standalone dev preview and are never loaded by the shell.
export default function EditorApp() {
  const summary = useResumeStore((s) => s.doc.summary);
  const updateSummary = useResumeStore((s) => s.updateSummary);

  return (
    <section className="rf-card" style={{ maxWidth: 480 }}>
      <h2>Resume Editor</h2>
      <p className="rf-muted">This component is federated from http://localhost:3001.</p>
      <label htmlFor="summary">Summary</label>
      <textarea
        id="summary"
        className="rf-input"
        rows={4}
        style={{ width: '100%', display: 'block' }}
        value={summary}
        onChange={(e) => updateSummary(e.target.value)}
      />
      <p data-testid="live-preview">
        <strong>Live preview Of Input-Field Hello User :</strong>{' '}
        {summary || 'Start typing your summary…'}
      </p>
      <p className="rf-muted bg-red-100 p-2 rounded-md border-2 border-red-200">
        Note: Changes are reflected in real-time above.
      </p>
    </section>
  );
}
