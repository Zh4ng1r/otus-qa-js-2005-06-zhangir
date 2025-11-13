export default {
  testEnvironment: 'node',
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        pageTitle: 'Test Report',
        outputPath: 'reports/test-report.html',
        includeFailureMsg: true,
        includeConsoleLog: true,
      },
    ],
  ],
};
export const moduleFileExtensions = ['ts', 'tsx', 'js', 'json'];

const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
};

export default config;
