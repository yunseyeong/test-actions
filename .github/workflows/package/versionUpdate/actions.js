const core = require('@actions/core');

try {
  const semVer = core.getInput('semVer');
  console.log(semVer);
  core.setOutput('result', semVer);
} catch (error) {
  core.setFailed(error.message);
}
