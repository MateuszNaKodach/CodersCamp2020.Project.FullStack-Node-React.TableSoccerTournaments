module.exports = {
  transform: {
    '^.+\.(t|j)s$': 'ts-jest'
  },
  testEnvironment: 'node',
  testRegex: './src/.*\\.(test|spec)?\\.(js|ts)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  roots: [
    '<rootDir>/src'
  ],
  collectCoverageFrom: [
    './src/**'
  ],
  setupFiles: [
    './test/setupJest.ts'
  ],
  coverageDirectory: './coverage',
}
