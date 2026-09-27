import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['**/dist/**', '**/node_modules/**', '**/.turbo/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // rspack.config.mjs files run under Node, not the browser — declare that scope
    // or ESLint's flat config reports 'process' as undefined.
    files: ['**/*.config.mjs'],
    languageOptions: {
      globals: { process: 'readonly' },
    },
  },
);
