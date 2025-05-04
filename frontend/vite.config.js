// vitest.config.js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  test: {
    globals: true,           // Use describe, it, expect globally without imports
    environment: 'jsdom',    // Simulate browser environment
    setupFiles: './src/setupTests.js', // Setup for jest-dom matchers
  },
});
