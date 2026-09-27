import { Button } from '@resumex/ui';

export default function Home() {
  return (
    <main className="p-3.5">
      <section className="rf-card rf-hero">
        <div>
          <p className="rf-badge rf-badge--ai">AI-Powered</p>
          <h1 className="display rf-mt">Chat your resume past the ATS.</h1>
          <p className="rf-muted">
            ResumeX streams AI suggestions straight into a live, Overleaf-style resume editor —
            accept a suggestion, watch your ATS score climb, export a pixel-perfect PDF.
          </p>
          <div className="rf-row rf-mt">
            <a className="rf-btn rf-btn--primary" href="login.html">
              Log in to get started →
            </a>
            <a className="rf-btn" href="#about-heading">
              See how it works
            </a>
          </div>
          <p className="rf-muted rf-mt mt-1">
            Tip: press <kbd>Ctrl/Cmd + K</kbd> for the command palette.
          </p>

          <div className="rf-hero-stats rf-mt">
            <div className="rf-hero-stat">
              <strong>+15 pts</strong>
              <span>avg. ATS score lift / session</span>
            </div>
            <div className="rf-hero-stat">
              <strong>45%</strong>
              <span>AI suggestions accepted</span>
            </div>
            <div className="rf-hero-stat">
              <strong>&lt; 10 min</strong>
              <span>time to first export</span>
            </div>
          </div>
        </div>
        <div className="rf-pane rf-hero-visual" data-streaming-demo>
          <div className="rf-row justify-between">
            <span className="rf-badge rf-badge--ai">Assistant</span>
            <div className="rf-gauge h-15 w-5" aria-label="ATS score 82">
              <span className="w-8 h-8 text-sm">82</span>
            </div>
          </div>
          <p className="rf-muted mt-1">Improving your summary…</p>
          <div className="rf-card mt-1 bg-[--rf-surface]">
            <div
              aria-live="polite"
              data-stream-out
              data-script="Senior Frontend Engineer with 6+ years architecting Module Federation micro-frontends in React and TypeScript, shipping AI-streamed resume tooling that lifts ATS scores by 15+ points."
            ></div>
          </div>
          <div className="rf-row rf-mt">
            <Button className="rf-btn rf-btn--primary" data-stream-start>
              Improve with AI
            </Button>
            <Button className="rf-btn rf-btn--danger" data-stream-stop hidden>
              Stop
            </Button>
            <Button className="rf-btn" data-stream-accept hidden>
              Accept
            </Button>
          </div>
          <p className="rf-badge rf-badge--ok rf-mt" data-stream-note hidden></p>
        </div>
      </section>

      <section className="rf-mt" aria-labelledby="about-heading">
        <h2 id="about-heading">About ResumeX</h2>
        <p className="rf-muted">
          We're a small team of engineers and career coaches who got tired of watching great
          candidates get filtered out by keyword-matching software before a human ever saw their
          resume.
        </p>

        <div className="rf-grid cols-3 rf-mt">
          <div className="rf-card">
            <h3>What we do</h3>
            <p className="rf-muted">
              We build an AI, ATS-aware resume &amp; cover-letter studio: a conversational assistant
              that rewrites, scores, and tailors your resume to a specific job description in real
              time.
            </p>
          </div>
          <div className="rf-card">
            <h3>How we help</h3>
            <p className="rf-muted">
              Paste a job description and our AI streams keyword-matched suggestions you can accept
              with one click, while a live ATS score shows exactly how much each change improves
              your odds.
            </p>
          </div>
          <div className="rf-card">
            <h3>Why it matters</h3>
            <p className="rf-muted">
              Over 75% of resumes never reach a human recruiter. ResumeForge closes that gap — so
              your experience gets read by a person, not filtered by a machine.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
