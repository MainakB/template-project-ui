#!/usr/bin/env node

const { execSync, exec } = require("child_process");

const runCommand = (command) => {
  try {
    execSync(`${command}`, {stdio: 'inherit'})
  } catch (err) {
    console.error(`Failed to execute command ${command}`, err);
    return false;
  }
  return true;
};

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/MainakB/tesui-tzattziki ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Cloning repository with name ${repoName}`);
const checkout = runCommand(gitCheckoutCommand);

if(!checkout) process.exit(code: -1)

console.log(`Installing dependencies for ${repoName}`);

const installedDeps = runCommand(installDepsCommand);

if(!installedDeps) process.exit(code: -1)

console.log(`Succesfuly cloned repo. Follow command to start.`);
console.log(`cd ${repoName} && grunt test <parameters for test. Read Readme.md>`)



