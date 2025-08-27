/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/pages/forms/index.tsx',
    'src/components/RHFForm.tsx',
    'src/components/UncontrolledForm.tsx',
    'src/components/ModalWrapper.tsx',
    'src/components/FormCard.tsx',
    'src/components/FormFields.tsx',
    'src/components/Button.tsx',
    'services/converterToBase64.ts',
    'store/formStore.ts'

  ],
};
