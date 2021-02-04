import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';

// This is the basic rollup config that builds an ES6 module
const rollupConfig = {
  input: './export/Exports.js',
  output: [
    {
      file: './build/JsBlip.js',
      format: 'es',
      name: 'vcr-bundle',
    },
  ],
  plugins: [
    eslint({
      throwOnError: true,
      throwOnWarning: true,
    }),
    // Default to 'production'
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
    }),
  ],
};

// Conditionally minify unless we're in 'development'
if (process.env.NODE_ENV !== 'development') {
  rollupConfig.plugins.push(
    terser(),
  );
}

// Conditionally also build a CommonJS module to support
// automated testing via nodejs
if (process.env.BUILD_TESTS !== 'no') {
  rollupConfig.output.push({
    file: './build/JsBlipCjs.js',
    format: 'cjs',
    name: 'test-bundle',
  });
}

export default rollupConfig;
