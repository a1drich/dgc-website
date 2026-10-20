import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  // .agents and .claude hold vendored agent skills, not site code.
  { ignores: ['dist', 'site', '.agents', '.claude'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: 'detect' } },
  },
  js.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,
  {
    rules: {
      // The site has no prop-types and no TypeScript.
      'react/prop-types': 'off',
      // Pages export a `meta` object next to the component (see usePageMeta).
      'react-refresh/only-export-components': ['warn', { allowExportNames: ['meta'] }],
    },
  },
  {
    files: ['*.config.js'],
    languageOptions: { globals: globals.node },
  },
]
