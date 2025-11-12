export const testEnvironment = 'node';
export const reporters = [
  'default',
  [
    'jest-html-reporter',
    {
      pageTitle: 'Test Report',
      outputPath: 'reports/test-report.html',
      includeFailureMsg: true,
      includeSuiteFailure: true,
    },
  ],
];
