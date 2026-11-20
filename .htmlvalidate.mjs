/**
 * html-validate for the built pages (`pnpm html:check`, after `pnpm build`).
 *
 * The rules are a copy of the semantic-html skill preset
 * (.agents/skills/semantic-html/assets/htmlvalidate.json). .agents/ is gitignored, so CI
 * cannot extend the file itself: when the preset changes, copy it here again. Only this
 * project's deliberate exceptions follow the copied block.
 */
const config = {
  root: true,
  extends: ["html-validate:recommended"],
  elements: ["html5"],
  rules: {
    // semantic-html skill preset
    "void-style": "off",
    "attr-quotes": "off",
    "attr-case": "off",
    "doctype-style": "off",
    "no-self-closing": "warn",
    "no-trailing-whitespace": "off",
    "attribute-boolean-style": "off",
    "attribute-empty-style": "off",
    "element-case": "off",
    "no-inline-style": "warn",
    "no-unknown-elements": "off",
    "prefer-native-element": "error",
    "prefer-button": "error",
    "no-redundant-role": "warn",
    "unique-landmark": "error",
    "heading-level": "error",
    "no-dup-id": "error",
    "valid-id": "off",

    // Project exceptions.
    // ThemeScript renders type="text/javascript" on the server and text/plain in the
    // browser, so a locale switch does not re-run it (see its module doc). The server
    // value must be explicit for that swap, which this stylistic rule calls redundant.
    "script-type": "off",
  },
};

export default config;
