/*
 * Jest configuration for Sidaurip GDM
 */
import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', 'src/__tests__/**/*.[jt]s?(x)'],
  setupFilesAfterEnv: [
    // Add setup logic if needed
  ],
  globals: {
    __EPRESS: true,
    __NEXT_INTERNAL_TESTS: true,
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\.(ts|tsx)$': 'ts-jest',
  },
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov', 'cobertura'],
};

export default config;
