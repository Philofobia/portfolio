/**
 * html-validate for the built pages (`pnpm html:check`, after `pnpm build`).
 *
 * Extends the semantic-html skill preset, so the skill stays the one source of the rules;
 * only this project's deliberate exceptions are listed here.
 */
const config = {
  root: true,
  extends: ["./.agents/skills/semantic-html/assets/htmlvalidate.json"],
  rules: {
    // ThemeScript renders type="text/javascript" on the server and text/plain in the
    // browser, so a locale switch does not re-run it (see its module doc). The server
    // value must be explicit for that swap, which this stylistic rule calls redundant.
    "script-type": "off",
  },
};

export default config;
