const { config } = require("./wdio.conf");

const chromeConfig = {
  ...config,
  capabilities: [
    {
      maxInstances: 10,
      browserName: "chrome",
      "goog:chromeOptions": {
        args: ["--start-maximized"],
      },
    },
  ],
};

exports.config = chromeConfig;
