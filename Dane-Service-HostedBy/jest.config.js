module.exports = {
    verbose: true,
    setupFilesAfterEnv: ['./frontend/src/setupTests.js'],
    coveragePathIgnorePatterns: ['/node_modules/'],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.svg$': 'jest-svg-transformer',
    },
};
