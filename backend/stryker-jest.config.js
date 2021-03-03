module.exports = {
  transform: {
    '^.+.(t|j)s$': 'ts-jest',
  },
  testEnvironment: 'node',
  testRegex: '[.](spec|test)[.]ts',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: ['./src/**'],
  setupFilesAfterEnv: ['jest-extended'],
  setupFiles: ['dotenv/config'],
  coverageDirectory: './coverage',
  clearMocks: true,
  testTimeout: 10000,
};
