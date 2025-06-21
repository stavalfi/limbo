/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import eslint from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
// @ts-expect-error - blablabla
import githubPlugin from "eslint-plugin-github";
// @ts-expect-error - blablabla
import importPlugin from "eslint-plugin-import";
import noAwaitInPromisePlugin from "eslint-plugin-no-await-in-promise";
import unusedImports from "eslint-plugin-unused-imports";
import { config, configs } from "typescript-eslint";

// config for example: https://github.com/typescript-eslint/typescript-eslint/blob/main/eslint.config.mjs
export default config(
  prettierConfig,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      "import/extensions": [".ts", ".tsx"],
      "import/resolver": {
        typescript: {},
      },
    },
    plugins: {
      github: githubPlugin,
      "no-await-in-promise": noAwaitInPromisePlugin,
      "unused-imports": unusedImports,
    },
  },
  // extends ...
  importPlugin.flatConfigs.recommended,
  eslint.configs.recommended,
  configs.recommendedTypeChecked,
  configs.strict,
  configs.strictTypeChecked,
  {
    ignores: ["**/*.json"],
    rules: {
      "import/no-named-as-default-member": "off",
      "unused-imports/no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^(?:_|routes)$",
          ignoreRestSiblings: true,
        },
      ],
      "unused-imports/no-unused-imports": "error",
      "require-await": "off", // must be disabled to make @typescript-eslint/require-await work
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/only-throw-error": "off", // migrated to biome
      "import/no-duplicates": "error",
      "import/no-named-as-default": "error",
      "import/named": "error",
      "no-mixed-spaces-and-tabs": "error",
      "no-unexpected-multiline": "error",
      "default-param-last": "error",
      "@typescript-eslint/no-base-to-string": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unused-expressions": "error",
      "import/no-cycle": "error",
      "import/namespace": "off", // typescript is doing it already
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksConditionals: true,
          checksVoidReturn: false,
        },
      ],
      "@typescript-eslint/no-var-requires": "error",
      "no-constant-condition": "error",
      "no-cond-assign": ["error", "always"],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/unbound-method": "error",
      "@typescript-eslint/no-inferrable-types": "error",
      "@typescript-eslint/explicit-module-boundary-types": [
        "error",
        { allowedNames: ["registerRoutes", "register"] },
      ],
      "no-useless-escape": "error",
      "@typescript-eslint/no-namespace": "error",
      "no-empty": [
        "error",
        {
          allowEmptyCatch: true,
        },
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/prefer-readonly": "error",
      "consistent-return": "error",
      "no-promise-executor-return": "error",
      "no-unreachable-loop": "error",
      "block-scoped-var": "error",
      "default-case-last": "error",
      "no-implied-eval": "error",
      "no-invalid-this": "error",
      "no-new-func": "error",
      "no-useless-call": "error",
      "@typescript-eslint/no-use-before-define": "error",
      "dot-notation": [
        "error",
        {
          allowPattern: "^[A-Z].*",
        },
      ],
      "no-inner-declarations": "error",
      "no-restricted-imports": [
        "error",
        {
          paths: [
            "console",
            {
              name: "lodash",
              importNames: ["cloneDeep"],
              message: "Please import 'cloneDeep' from '@p/shared' instead.",
            },
          ],
        },
      ],
      "no-await-in-promise/no-await-in-promise": "error",
      "github/array-foreach": "error",
    },
  },
);
