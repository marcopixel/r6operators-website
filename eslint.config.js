import tseslint from "typescript-eslint"
import pluginVue from "eslint-plugin-vue"
import pluginUnicorn from "eslint-plugin-unicorn"
import configPrettier from "eslint-config-prettier"

// shared rules
const sharedRules = {
  "@typescript-eslint/no-unused-vars": "off",
  "unicorn/filename-case": [
    "error",
    {
      cases: {
        pascalCase: true,
        camelCase: true,
        kebabCase: false
      },
      ignore: [
        "globals.d.ts",
        "vite-env.d.ts",
        "vite.config.ts",
        "vite-environment.d.ts",
        String.raw`\.spec.ts(x)?`,
        String.raw`\.types.ts(x)?`,
        String.raw`\.stories.ts(x)?`,
        String.raw`\.styled.ts(x)?`,
        String.raw`\.styles.ts(x)?`
      ]
    }
  ],
  "unicorn/no-abusive-eslint-disable": "off",
  "unicorn/no-useless-undefined": "off",
  "unicorn/numeric-separators-style": "off",
  "unicorn/prefer-global-this": "off",
  "unicorn/prevent-abbreviations": "off"
}

export default tseslint.config(
  {
    ignores: ["*.d.ts", "**/coverage", "**/dist", "**/node_modules", "**/public"]
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.cjs", "**/*.mjs"],
    extends: [
      tseslint.configs["recommended"],
      pluginUnicorn.configs["recommended"],
      configPrettier
    ],
    rules: {
      ...sharedRules
    }
  },
  {
    files: ["scripts/**/*.ts"],
    extends: [
      tseslint.configs["recommended"],
      pluginUnicorn.configs["recommended"],
      configPrettier
    ],
    rules: {
      ...sharedRules,
      "unicorn/no-process-exit": "off"
    }
  },
  {
    files: ["**/*.vue"],
    extends: [
      tseslint.configs["recommended"],
      pluginVue.configs["flat/recommended"],
      pluginUnicorn.configs["recommended"],
      configPrettier
    ],
    languageOptions: {
      parserOptions: {
        parser: "@typescript-eslint/parser"
      }
    },
    rules: {
      ...sharedRules
    }
  }
)
