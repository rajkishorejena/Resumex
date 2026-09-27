import React, { Suspense } from 'react';
import type { ReactNode } from 'react';
import { createBrowserRouter, RouterProvider, Link, Outlet } from 'react-router';
import { Button } from '@resumex/ui';

const EditorApp = React.lazy(() => import('editor/EditorApp'));
const TemplatesApp = React.lazy(() => import('templates/TemplatesApp'));

function Layout() {
  return (
    <div>
      <header className="rf-header">
        <strong>Resumex</strong>
        <nav className="rf-nav">
          <Link to="/">Home</Link>
          <Link to="/editor/demo">Editor</Link>
          <Link to="/templates">Templates</Link>
        </nav>
      </header>
      <main style={{ padding: 24 }}>
        <Outlet />
      </main>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Welcome to resumex</h1>
      <p>Open the Editor to load the federated remote running on port 3001.</p>
      <Button onClick={() => alert('Shared @resumex/ui Button works!')}>
        Try the shared Button
      </Button>
    </div>
  );
}

function RemoteFallback() {
  return <p>Loading editor remote…</p>;
}

function TemplatesRemoteFallback() {
  return <p>Loading templates remote…</p>;
}

interface BoundaryProps {
  children: ReactNode;
}
interface BoundaryState {
  hasError: boolean;
}

class RemoteErrorBoundary extends React.Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { hasError: false };
  static getDerivedStateFromError(): BoundaryState {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <p>Could not load the editor remote. Make sure it is running on http://localhost:3001.</p>
      );
    }
    return this.props.children;
  }
}

class TemplatesRemoteErrorBoundary extends React.Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { hasError: false };
  static getDerivedStateFromError(): BoundaryState {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <p>
          Could not load the templates remote. Make sure it is running on http://localhost:3002.
        </p>
      );
    }
    return this.props.children;
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'editor/:id',
        element: (
          <RemoteErrorBoundary>
            <Suspense fallback={<RemoteFallback />}>
              <EditorApp />
            </Suspense>
          </RemoteErrorBoundary>
        ),
      },
      {
        path: 'templates',
        element: (
          <TemplatesRemoteErrorBoundary>
            <Suspense fallback={<TemplatesRemoteFallback />}>
              <TemplatesApp />
            </Suspense>
          </TemplatesRemoteErrorBoundary>
        ),
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
