
var serverlessSDK = require('./serverless_sdk/index.js');
serverlessSDK = new serverlessSDK({
  orgId: 'brianrwells',
  applicationName: 'cityfoo',
  appUid: '000000000000000000',
  orgUid: '000000000000000000',
  deploymentUid: 'undefined',
  serviceName: 'smscityfoo',
  shouldLogMeta: true,
  shouldCompressLogs: true,
  disableAwsSpans: false,
  disableHttpSpans: false,
  stageName: 'dev',
  serverlessPlatformStage: 'prod',
  devModeEnabled: false,
  accessKey: null,
  pluginVersion: '3.6.16',
  disableFrameworksInstrumentation: false
});

const handlerWrapperArgs = { functionName: 'smscityfoo-dev-app', timeout: 6 };

try {
  const userHandler = require('./index.js');
  module.exports.handler = serverlessSDK.handler(userHandler.handler, handlerWrapperArgs);
} catch (error) {
  module.exports.handler = serverlessSDK.handler(() => { throw error }, handlerWrapperArgs);
}