module.exports = {
  default: `--require-module ts-node/register --require tests/stepsDefinitions/**/*.ts --format json:reports/cucumber_report.json --format json:reports/results.json --tags 'not @skip'`
};
