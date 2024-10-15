const { defineConfig } = require('cypress');
const { deleteFileOrFolder } = require('./cypress/support/utilities');
const registerReportPortalPlugin = require('@reportportal/agent-js-cypress/lib/plugin');


const reportportalOptions = {
  apiKey: '<your-reportportal-api-key>',
  endpoint: 'http://localhost:5500/api/v1',
  project: 'SRD_Regression_Suite_Automation',
  launch: 'Cypress_srd_regression_launch',
  description: 'automation suite of monthly srd regression with cypress',
  attributes:[
    { key: 'runDate', value: new Date().toISOString().split('T')[0]},
    { key: 'browser', value: 'chrome' },
  ],
  debug:false,
  uploadVideo:true,
  uploadVideoForNonFailedSpec:false,
  autoMerge: true,
};

const mochawesomeOptions = {
  charts: true,
  reportPageTitle: 'Regression-suite-automation',
  embeddedScreenshots: true,
  inlineAssets: true,
  saveAllAttempts: false,
  videoOnFailOnly: true
};

module.exports = defineConfig({

  viewportWidth: 1440,
  viewportHeight: 1080,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    // reporterEnabled: 'cypress-mochawesome-reporter, @reportportal/agent-js-cypress',
    reporterEnabled: 'cypress-mochawesome-reporter',
    cypressMochawesomeReporterOptions: mochawesomeOptions,
    // reportportalAgentJsCypressReporterOptions: reportportalOptions
  },
  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: true,
  video: true,
  videoCompression: true,
  e2e: {
    baseUrl: "https://automationexercise.com/",
    experimentalStudio: true,
    experimentalOriginDependencies: true,
    experimentalModifyObstructiveThirdPartyCode: true,
    experimentalRunAllSpecs: true,
    experimentalMemoryManagement: true,
    defaultCommandTimeout: 30000,
    chromeWebSecurity: false,
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
    specPattern: "cypress/e2e/*.cy.js",
    setupNodeEvents(on, config) {

      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);

      on('task', {

        delete_file_or_folder(fPath){

          return deleteFileOrFolder(fPath);

        }
      });

      registerReportPortalPlugin(on, config);
      return config;
    },
  }
});
