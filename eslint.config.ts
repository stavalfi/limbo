import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import vitest from "@vitest/eslint-plugin";
// @ts-ignore
import importPlugin from "eslint-plugin-import";
// @ts-ignore
import githubPlugin from "eslint-plugin-github";
import prettierConfig from "eslint-config-prettier";
import noAwaitInPromisePlugin from "eslint-plugin-no-await-in-promise";
import unusedImports from "eslint-plugin-unused-imports";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// config for example: https://github.com/typescript-eslint/typescript-eslint/blob/main/eslint.config.mjs
export default tseslint.config(
  prettierConfig,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
          jsx: true,
        },
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
      // @ts-ignore
      vitest,
      "unused-imports": unusedImports,
    },
  },
  // extends ...
  importPlugin.flatConfigs.recommended,
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    ignores: ["**/*.json"],
    // base config
    rules: {
      // @ts-ignore
      ...vitest.configs.recommended.rules,
      "vitest/valid-expect": ["error", { maxArgs: 3 }],
      "vitest/no-import-node-test": "error",
      "vitest/expect-expect": "error",
      "vitest/valid-title": "error",
      "no-unused-vars": "error", // or "@typescript-eslint/no-unused-vars": "error",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": "error",
      "require-await": "error", // must be disabled to make @typescript-eslint/require-await work
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/only-throw-error": "error", // migrated to biome
      "import/no-duplicates": "error",
      "import/no-named-as-default-member": "error",
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
      "import/namespace": "error", // typescript is doing it already
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
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "none", //Ignore unused arguments because we have many valid cases, such as ab-test.getUserGroup(user) and user is often unused
          varsIgnorePattern: "^_|^[A-Z]$", //allow the the variable prefix "_" to be unused since it's very deliberate. Allow <infer T>... definitions to un-use T.
        },
      ],
      "@typescript-eslint/unbound-method": "error",
      "@typescript-eslint/no-inferrable-types": "error",
      "@typescript-eslint/explicit-module-boundary-types": "error",
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
  }
);
