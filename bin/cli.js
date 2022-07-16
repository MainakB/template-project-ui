#!/usr/bin/env node

const { execSync } = require("child_process");

const runCommand = (command) => {
  try {
  } catch (err) {
    console.error(`Failed to execute command ${command}`, err);
    return false;
  }
  return true;
};

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/MainakB/test-template-project ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Cloning repository with name ${repoName}`);
const checkout = runCommand(gitCheckoutCommand);

if(!checkout) process.exit(code: -1)

console.log(`Installing dependencies for ${repoName}`);

const installedDeps = runCommand(installDepsCommand);

if(!installedDeps) process.exit(code: -1)

console.log(`Succesfuly cloned repo. Follow command to start.`);
console.log(`cd ${repoName} && grunt test <parameters for test. Read Readme.md>`)



