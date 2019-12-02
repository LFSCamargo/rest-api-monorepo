module.exports = {
  "testEnvironment": "node",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  "globals": {
    "ts-jest": {
      "tsConfigFile": "../../tsconfig.json"
    }
  },
  "testMatch": [
    "**/*.spec.+(ts|tsx|js)"
  ]
}