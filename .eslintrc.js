module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname,
    sourceType: 'module',
    "ecmaVersion": 2021,
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    "airbnb",
    "airbnb-typescript",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-underscore-dangle': 'off',
    "class-methods-use-this": 'off',

    "import/prefer-default-export": "off",
    "import/order": [
      "error",
      {
        "groups": ["builtin", "external", "internal", ["parent", "sibling"], "type"],
        "pathGroups": [
          { "pattern": "react*", "group": "external", "position": "before" },
          { "pattern": "./**/*.scss", "group": "type", "position": "before" }
        ],
        "pathGroupsExcludedImportTypes": ["react"],
        "newlines-between": "always",
        "alphabetize": { "order": "asc", "caseInsensitive": true }
      }
    ],
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        "multiline": { "delimiter": "comma", "requireLast": true },
        "singleline": { "delimiter": "comma", "requireLast": false },
        "multilineDetection": "brackets"
      }
    ],
    "@typescript-eslint/no-inferrable-types": [
      "error",
      {
        "ignoreProperties": true
      }
    ]
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [
          ".ts",
        ],
        "moduleDirectory": [
          "node_modules",
          "src"
        ]
      }
    }
  }
};
