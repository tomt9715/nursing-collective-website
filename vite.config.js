import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { purgeCSSPlugin } from '@fullhuman/postcss-purgecss';

// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get all HTML files in root directory (excluding email-templates)
const htmlFiles = readdirSync(__dirname)
  .filter(file => file.endsWith('.html'))
  .reduce((entries, file) => {
    const name = file.replace('.html', '');
    entries[name] = resolve(__dirname, file);
    return entries;
  }, {});

export default defineConfig({
  // Base public path - adjust if deploying to subdirectory
  base: '/',

  build: {
    outDir: 'dist',
    emptyDirOnBuild: true,

    // Multi-page app configuration
    rollupOptions: {
      input: htmlFiles,
      output: {
        // Keep JS files organized
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Organize assets by type
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },

    // Use esbuild for minification (built-in, faster than terser)
    minify: 'esbuild',

    // Generate sourcemaps for debugging production issues
    sourcemap: true,
  },

  css: {
    postcss: {
      plugins: [
        // PurgeCSS to remove unused Bootstrap styles
        purgeCSSPlugin({
          content: [
            './*.html',
            './*.js',
            './css/*.css',
          ],
          // Bootstrap-specific safelist
          safelist: {
            // Keep these exact class names
            standard: [
              // Dynamic theme classes
              /^dark-/,
              /^light-/,
              'dark-mode',
              'light-mode',
              // Bootstrap modal/dropdown states
              'show',
              'hide',
              'fade',
              'collapse',
              'collapsing',
              'active',
              'disabled',
              // Cart states
              'empty',
              'cart-open',
              // Loading states
              'loading',
              'loaded',
              'error',
              // Form validation
              'is-valid',
              'is-invalid',
              'was-validated',
            ],
            // Keep classes matching these patterns
            deep: [
              /^modal/,
              /^dropdown/,
              /^tooltip/,
              /^popover/,
              /^alert/,
              /^btn/,
              /^nav/,
              /^card/,
              /^form/,
              /^input/,
              /^table/,
              /^badge/,
              /^spinner/,
              /^toast/,
              /^offcanvas/,
            ],
            // Keep classes with these in the name
            greedy: [
              /data-theme/,
              /aria-/,
            ],
          },
          // Don't purge these files
          blocklist: [],
          // Extract classes from these file types
          defaultExtractor: content => {
            // Match class names, data attributes, and JS string references
            const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
            const innerMatches = content.match(/[^<>"'`\s.(){}[\]#]+/g) || [];
            return broadMatches.concat(innerMatches);
          },
        }),
      ],
    },
  },

  // Development server settings
  server: {
    port: 3000,
    open: true,
  },

  // Preview server for testing production build
  preview: {
    port: 4173,
  },
});
