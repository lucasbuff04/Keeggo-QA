const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");

module.exports = defineConfig({
  e2e: {
    specPattern: [
      "cypress/e2e/**/*.feature",
      "cypress/e2e/**/*.cy.{js,ts}"
    ],
    excludeSpecPattern: [
      "*.page.js",
      "**/page/**"
    ],

    baseUrl: "http://localhost:3000",

    viewportWidth: 1920,
    viewportHeight: 1080,

    async setupNodeEvents(on, config) {
      // Ativa o cucumber
      await addCucumberPreprocessorPlugin(on, config);

      // Preprocessa .feature
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)]
        })
      );

      return config;
    },
  },
});
