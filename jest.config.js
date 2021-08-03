module.exports = {
    verbose: true,
    preset: 'jest-playwright-preset',
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    "reporters": [
        "default",
        ["./node_modules/jest-html-reporter", {
          "pageTitle": "Test Report"
        }]
      ]
    }