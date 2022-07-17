#!/usr/bin/env node

const { execSync } = require("child_process");
const open = require("open");

const getCommandOutput = (command) => {
  try {
    return execSync(`${command}`).toString();
  } catch (err) {
    console.error(`Failed to execute command and fetch output ${command}`, err);
    return null;
  }
};

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: "inherit" });
  } catch (err) {
    console.error(`Failed to execute command ${command}.\n`, err);
    return false;
  }
  return true;
};

const printErrorExit = (msg) => {
  if (msg) console.log(msg);
  process.exit(-1);
};

const checkNodeVersion = () => {
  const nodeVersionCommand = `node -v`;
  const nodeError = `Supported nodejs version is >=v16. Please make sure correct node version is installed.`;

  const isValidCommand = runCommand(nodeVersionCommand);
  let nodeVersion = null;

  if (isValidCommand) {
    nodeVersion = getCommandOutput(nodeVersionCommand);
    if (!nodeVersion) {
      printErrorExit(nodeError);
    }

    const nodeMajor = nodeVersion.split(".")[0].split("v")[1];

    if (!nodeMajor || isNaN(nodeMajor) || Number(nodeMajor) < 16) {
      printErrorExit(nodeError);
    }
  } else {
    printErrorExit(nodeError);
  }
};

const doGitCheckout = () => {
  const gitCheckoutCommand = `git clone --depth 1 https://github.com/MainakB/tesui-tzattziki ${repoName}`;
  console.log(`Cloning repository with name ${repoName}...`);
  const checkout = runCommand(gitCheckoutCommand);
  if (!checkout) printErrorExit(`Unable to setup template repository.`);
};

const installLocalDeps = () => {
  const installDepsCommand = `cd ${repoName} && npm install`;
  console.log(`Installing dependencies for ${repoName}...`);
  const installedDeps = runCommand(installDepsCommand);
  if (!installedDeps) printErrorExit(`Unable to install local dependencies.`);
};

const openDocs = () => open("bin/index.html").then(() => {});

const run = (repoName) => {
  checkNodeVersion();
  doGitCheckout();
  installLocalDeps();
  installLocalDeps();

  openDocs().then(() => {});
};
const repoName = process.argv[2];
if (repoName) {
  run(repoName);
  console.log(`Succesfuly cloned repo. Follow command to start.`);
  console.log(
    `cd ${repoName} && grunt test <parameters for test. Read Readme.md>`
  );
} else {
  printErrorExit(
    `Local workspace name is required. Run the command as 'npx iostarter <local-folder-name>'`
  );
}
