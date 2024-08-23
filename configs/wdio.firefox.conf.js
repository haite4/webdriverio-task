const { config } = require("./wdio.conf");

const firefoxConfig = {
  ...config,
  capabilities: [
    {
      maxInstances: 2,
      browserName: "firefox",
      "moz:firefoxOptions": {
        args: ["--width=1900", "--height=1000"],
      },
    },
  ],
  windowSize: "maximize",
};

exports.config = firefoxConfig;
