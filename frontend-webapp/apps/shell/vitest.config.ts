import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      // Vite/Vitest can't resolve Module Federation's runtime-only module id
      // ('editor/EditorApp') the way a browser can at runtime, so tests point
      // it at a local stub instead — a plain vi.mock is too late here because
      // Vite's import-analysis plugin fails before vi.mock can intercept it.
      'editor/EditorApp': path.resolve(process.cwd(), 'test/mocks/EditorAppStub.tsx'),
      'templates/TemplatesApp': path.resolve(process.cwd(), 'test/mocks/TemplatesAppStub.tsx'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
  },
});
