import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    globalIgnores([
        "node_modules/**",
        "dist/**",
        "coverage/**",
        ".husky/_/**",
    ]),

    js.configs.recommended,

    {
        files: ["**/*.{js,jsx,mjs,ts,tsx}"],
        plugins:{
            react,
            "react-hooks": reactHooks,
        },
        settings:{
            react: {version: "detect"},
        },
        rules:{

            "react-hooks/rules-of-hooks": ["error"],
            "react-hooks/exhaustive-deps": ["error"],        
        }
    },

    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: { project: "./tsconfig.json" },
        },
        plugins: { "@typescript-eslint": tseslint.plugin },
        rules: {
            ...tseslint.configs.recommended.rules,
            "@typescript-eslint/no-unused-vars": "warn",
        },
    },

    {
        files: ["**/*.test.tsx", "**/*.test.ts"],
        plugins: { jest },
        languageOptions: {
            globals: { ...jest.environments.globals.jest },
        },
        rules: {
            ...jest.configs.recommended.rules,
            "jest/expect-expect": "warn",
        },
    }
])