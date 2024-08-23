const { config } = require("./wdio.conf");

const firefoxConfig = {
  ...config,
  capabilities: [
    {
      maxInstances: 2,
      browserName: "MicrosoftEdge",
      "ms:edgeOptions": {
        args: ["--start-maximized"],
      },
    },
  ],
};

exports.config = firefoxConfig;
