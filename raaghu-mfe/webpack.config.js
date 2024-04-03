const million = require("million/compiler");
module.exports = {
  plugins: [
    million.webpack({
      auto: {
        threshold: 0.05,
        skip: ["useBadHook", /badVariable/g],
        mute: true
      },
    }),
  ],
};