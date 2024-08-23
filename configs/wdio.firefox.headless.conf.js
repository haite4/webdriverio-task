const { config } = require("./wdio.conf");

const firefoxHeadlessConfig = {
  ...config,
  capabilities: [
    {
      maxInstances: 2,
      browserName: "firefox",
      "moz:firefoxOptions": {
        args: ["-headless"],
      },
    },
  ],
};

exports.config = firefoxHeadlessConfig;
