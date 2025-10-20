import esbuild from 'esbuild';
import fs from 'fs';
// FIX: Import `process` to provide correct typings for the Node.js global object
// and resolve the type error on `process.exit`.
import process from 'process';

// Create dist directory if it doesn't exist
if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist');
}

esbuild.build({
  entryPoints: ['index.tsx'],
  bundle: true,
  outfile: 'dist/bundle.js',
  minify: true,
  sourcemap: 'inline',
  target: ['es2020'],
  // define is crucial for injecting environment variables at build time
  define: {
    'process.env.API_KEY': `"${process.env.API_KEY || ''}"`,
  },
}).catch((err) => {
    console.error('Build failed:', err);
    process.exit(1);
});
