module.exports = {
  transform: {
    '^.+\.(t|j)s$': 'ts-jest'
  },
  testEnvironment: 'node',
  testRegex: '(spec|test)[.]ts',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: [
    './src/**'
  ],
  setupFiles: [
    './test/setupJest.ts'
  ],
  coverageDirectory: './coverage',
}
