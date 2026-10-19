// Kogu ESLint 設定(ESLint 10 = flat config のみ / .eslintrc 形式は不使用)
// 役割分担: Prettier = 整形、ESLint = 品質チェック(整形系ルールは最後に無効化)
import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import globals from "globals";
// `/flat` は name 付きエクスポート(config-inspector 対応)。必ず最後に置く
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig(
  // 生成物は Lint 対象外
  {
    ignores: ["dist/**", ".astro/**", "node_modules/**"],
  },
  // JavaScript / TypeScript の推奨ルール
  js.configs.recommended,
  tseslint.configs.recommended,
  // 実行環境のグローバル変数(no-undef の誤検知防止)
  //   *.mjs / *.js … ビルド設定等(Node.js 環境)
  //   *.ts / *.tsx … ページ・コンポーネント(ブラウザ環境)
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ["**/*.{ts,tsx,jsx}"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  // Prettier と競合する整形系ルールを無効化 —— 必ず最後に配置(公式 README の規約)
  eslintConfigPrettier,
);
