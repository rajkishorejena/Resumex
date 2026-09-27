// Module Federation needs the real entry to load asynchronously so shared
// singletons (react, react-dom, react-router) are negotiated first. Every
// app in this monorepo follows this same index.ts -> bootstrap.tsx pattern.
import('./bootstrap');
