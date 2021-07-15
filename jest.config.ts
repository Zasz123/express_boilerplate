export default {
  roots: ["<rootDir>/src"],
  testMatch: ["**/__test__**/*.+(ts)", "**/?(*.)+(spec|test).+(ts)"],
  transform: {
    "^.+\\.(ts)$": "ts-jest"
  }
};
