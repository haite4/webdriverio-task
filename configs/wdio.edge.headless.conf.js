const { config } = require("./wdio.conf");
const chromeHeadlessConfig = {
  ...config,

  capabilities: [
    {
      maxInstances: 2,
      browserName: "MicrosoftEdge",
      "ms:edgeOptions": {
        args: [
          "--headless",
          "--start-maximized",
          "--no-sandbox",
          "--disable-gpu",
          "--window-size=1280,800",
          "--allow-insecure-localhost",
        ],
      },
    },
  ],
};

exports.config = chromeHeadlessConfig;
