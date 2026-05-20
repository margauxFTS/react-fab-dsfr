import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jest from "eslint-plugin-jest";
import jestDom from "eslint-plugin-jest-dom";
import testingLibrary from "eslint-plugin-testing-library";
import jsxA11y from "eslint-plugin-jsx-a11y";
import { defineConfig, globalIgnores } from "eslint/config";



import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    // Ignorer les fichiers et dossiers suivants
    globalIgnores([
        "node_modules/**",
        "dist/**",
        "coverage/**",
        ".husky/_/**",
    ]),

    js.configs.recommended,

    // Configuration globale pour les fichiers JavaScript et TypeScript
    {
        files: ["**/*.{js,jsx,mjs,ts,tsx}"],
        languageOptions: {
            globals: {
                ...globals.browser, 
                ...globals.jest,  
            },
        },
        plugins:{
            react,
            "react-hooks": reactHooks,
            "jsx-a11y": jsxA11y,
        },
        settings:{
            react: {version: "detect"},
        },
        rules:{
            "react/react-in-jsx-scope": "off",
            "react-hooks/rules-of-hooks": ["error"],
            "react-hooks/exhaustive-deps": ["error"],    
            ...jsxA11y.configs.recommended.rules,    
        }
    },

    // Configuration spécifique pour les fichiers TypeScript
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

    // Configuration spécifique pour les fichiers de test
    {
        files: ["**/*.test.tsx", "**/*.test.ts"],
        plugins: { 
            jest,
            "jest-dom": jestDom,
            "testing-library": testingLibrary
        },
        languageOptions: {
            globals: { ...jest.environments.globals.jest },
        },
        rules: {
            ...jest.configs.recommended.rules,
            "jest/expect-expect": "warn",
            ...jestDom.configs.recommended.rules,
            ...testingLibrary.configs.recommended.rules,
        },
    }
])