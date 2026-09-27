import { TEMPLATES, useTemplatesStore } from './model/templatesStore';
// Imported here (not bootstrap.tsx) so the CSS ships with the federated module the shell actually loads.
import '@resumex/ui/tokens.css';
import '@resumex/ui/tailwind.css';

// This is the ONLY file exposed via Module Federation (see exposes.
// './TemplatesApp' in rspack.config.mjs). index.ts/bootstrap.tsx above are for
// standalone dev preview and are never loaded by the shell.
export default function TemplatesApp() {
  const selectedId = useTemplatesStore((s) => s.selectedId);
  const select = useTemplatesStore((s) => s.select);

  return (
    <section className="rf-card" style={{ maxWidth: 640 }}>
      <h2>Resume Templates</h2>
      <p className="rf-muted">This component is federated from http://localhost:3002.</p>
      <div
        style={{
          display: 'grid',
          gap: 12,
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        }}
      >
        {TEMPLATES.map((template) => (
          <button
            key={template.id}
            type="button"
            data-testid={`template-${template.id}`}
            className="rf-card"
            style={{
              textAlign: 'left',
              cursor: 'pointer',
              borderColor: selectedId === template.id ? 'var(--rf-accent)' : undefined,
            }}
            onClick={() => select(template.id)}
          >
            <strong>{template.name}</strong>
            <p className="rf-muted" style={{ margin: 0 }}>
              {template.description}
            </p>
          </button>
        ))}
      </div>
      <p data-testid="selected-template">
        <strong>Selected template:</strong> {selectedId}
      </p>
    </section>
  );
}
