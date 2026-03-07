import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  basePath: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    plugins: {
      import: (await import("eslint-plugin-import")).default,
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"], // 1. React, 2. Next.js, 3. 외부 라이브러리 (pathGroups로 세분화)
            "internal",              // 4. 내부 패키지 (@split/*)
            ["parent", "sibling", "index"], // 5, 6. 상대 경로
            "type",                  // 7. 타입 전용 import
            "style",                 // 8. 스타일
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "next/**",
              group: "builtin",
              position: "after",
            },
            {
              pattern: "@split/**",
              group: "internal",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["react", "next/**"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
];

export default eslintConfig;
