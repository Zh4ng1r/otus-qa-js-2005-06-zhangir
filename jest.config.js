export const preset = 'ts-jest';
export const testEnvironment = 'node';
export const transform = {
  '^.+\\.(ts|tsx)$': 'ts-jest',
};
export const moduleFileExtensions = ['ts', 'tsx', 'js', 'json'];

const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
};

export default config;
