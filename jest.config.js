module.exports = {
  coverageReporters: ['text', 'cobertura', 'lcov'],
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/*.test.(ts|js)'],
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: ['src/app.ts', 'src/index.ts', 'src/.*/types.ts', 'src/config', 'src/di']
};
