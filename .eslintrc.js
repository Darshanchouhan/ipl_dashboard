module.exports = {
  parserOptions: {
    ecmaVersion: "latest", // Use ES6 parser. Browsers other than IE support it
    sourceType: "module",
  },
  plugins: [
    "template", // Handle Tornado templates and JS in HTML files
    "html", // Handle html script tag errors
  ],
  env: {
    es6: true, // Allow ES6 in JavaScript
    browser: true, // Include browser globals
    jquery: true, // Include jQuery and $
    mocha: true, // Include it(), assert(), etc
    node: true,
  },
  globals: {
    _: true, // underscore.js
    d3: true, // d3.js
    vg: true, // vega.js
    L: true, // leaflet.js
    ga: true, // Google analytics
    g1: true, // g1.min.js
    topojson: true, // topojson.js
    moment: true, // moment.js
    numeral: true, // numeral.js
    assert: true, // chai.js
  },
  extends: "eslint:recommended",
  rules: {
    /* Override default rules */
    "no-unused-vars": "off",
    indent: ["off", 2], // We eventually want 2 space indentation
    "linebreak-style": ["off", "unix"], // We eventually want UNIX style line
    quotes: ["off", "double"], // We may go for a double-quotes style
    semi: ["off", "never"], // We may go for a no-semicolon style
    "no-redeclare": "off",
    "no-global-assign": "off",
  },
};
