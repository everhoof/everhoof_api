require('./env');

module.exports = {
  testTimeout: 30000,
  moduleNameMapper: {
    '^@common(.*)$': '<rootDir>/src/common$1',
    '^@config(.*)$': '<rootDir>/src/config$1',
    '^@modules(.*)$': '<rootDir>/src/modules$1',
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'json',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '/test/.*\\.(e2e-spec).(ts|tsx|js)$',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,tsx,ts}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  coverageReporters: [
    'json',
    'lcov',
  ],
  testURL: 'http://localhost',
};
