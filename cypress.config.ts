import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents() {
      // implement node event listeners here
    },
    supportFile: "cypress/support/commands.ts",
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
