"use strict";
// require("dotenv").config();
let fs = require("fs");
let path = require("path");
let { Tzatziki } = require("tzatziki-core");

module.exports = function (grunt) {
  require("jit-grunt")(grunt, {
    continue: "grunt-continue",
  });

  // grunt.initConfig({
  // shell: {
  //   test: {
  //     command: `npx ${wdiorun} ./node_modules/tziki/wdio.conf.ts`,
  //   },
  // },
  // });

  // grunt.loadNpmTasks("grunt-shell-spawn");

  grunt.registerTask("pretest", [
    "task:setupConfigs",
    // "shell:compile",
    // "task_setUp:updateProxyForRallyIntegration",
    // "task_setUp:updateTestHelper",
    // "task_setUp:updateTableauIntegrationParams",
    // "task_setUp:setParallelExecutionCount",
    // "task_setUp:setEnvVariableTestModules",
    // "task_setUp:setEnvVariableBrowser",
    // "task_setUp:setEnvVariableChromeEdgeDriver",
    // "task_setUp:isWebDriverManagerUpdateRequired",
    // "task_webdriverManager:update",
    // "shell:start_webdriver",
    // "task_setUp:setNetThrottle",
  ]);

  grunt.registerTask("test", [
    "pretest",
    "task:startTest",
    // "task_merge_jsons",
    // // 'concat',
    // "task_merge_logs",
    // "shell:clean_build",
    // "task_rallyIntegration",
    // "continue:fail-on-warning",
  ]);

  grunt.registerTask("task:setupConfigs", "Run tests", function () {
    try {
      var done = this.async();
      return Tzatziki.TestRunner.initConfigs({
        testType: "wdio",
        browser: grunt.option("browser"),
        suites: grunt.option("suites"),
        customer: grunt.option("customer"),
      }).then(
        () => {
          grunt.log.ok("Test runner config setup complete!");
          return done(true);
        },
        function (error) {
          grunt.log.error(`Test runner config setup failed: ${error.message}`);
          return done(false);
        }
      );
    } catch (err) {
      throw err;
      grunt.verbose.or.write("Doing something").error().error(err.message);
    }
  });

  grunt.registerTask("task:startTest", "Start test run", function () {
    try {
      var done = this.async();
      console.log(`Tset run startxs`);
      return Tzatziki.TestRunner.runTest().then(
        function (code) {
          console.log(`Tset run done`);
          grunt.log.debug(`wdio testrunner finished with exit code ${code}`);
          return done(code === 0);
        },
        function (error) {
          grunt.log.error(`Something went wrong: ${e}`);
          return done(false);
        }
      );

      // spec: ["src/customers/generic/features/**/*.feature"],
      // cucumberOpts: {
      //   // <string[]> (file/dir) require files before executing features
      //   require: ["src/services/login-service/step-definitions/**/*.ts"],
      // },
      // grunt.task.run("shell:test");
      // var wdio = new Launcher(
      //   path.join(__dirname, "node_modules/tziki/wdio.conf.ts"),
      //   {
      //     spec:
      //       // [
      //       [
      //         "src/customers/generic/features/login.feature",
      //         // "features/login.featuire",
      //       ],
      //     // ["features/login.featuire"],
      //     // ],
      //     // Object.values(testSuite),
      //     // ["src/customers/generic/features/**/*.feature"],
      //     cucumberOpts: {
      //       // <string[]> (file/dir) require files before executing features
      //       require: ["src/services/**/step-definitions/**/*.ts"],
      //     },
      //   }
      // );
      // console.log("nextxs is");
      // return wdio.run().then(
      //   function (code) {
      //     grunt.log.debug(`wdio testrunner finished with exit code ${code}`);
      //     return done(code === 0);
      //   },
      //   function (error) {
      //     grunt.log.error(`Something went wrong: ${e}`);
      //     return done(false);
      //   }
      // );
    } catch (err) {
      grunt.verbose.or.write("Doing something").error().error(err.message);
    }
  });
};
