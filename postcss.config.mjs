const config = {
  plugins: {
    // optimize: false — Turbopack's own Lightning CSS pass prefixes and minifies the CSS,
    // and reports through turbopack.ignoreIssue (next.config.ts). Tailwind's pass would
    // print the harmless :target-current warning on every build with no way to filter it.
    "@tailwindcss/postcss": { optimize: false },
  },
};

export default config;
