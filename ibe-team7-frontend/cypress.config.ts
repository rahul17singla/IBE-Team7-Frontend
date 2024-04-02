import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  e2e: {
    async setupNodeEvents(on, config) {
      const codeCoverageTask = await import("@cypress/code-coverage/task");

      // Call the code coverage task with the provided arguments
      codeCoverageTask.default(on, config);

      // Include any other plugin code...

      // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config;
    },
    supportFile: "cypress/support/e2e.ts",
  },
});
