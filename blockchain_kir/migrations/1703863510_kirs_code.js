var Kirs = artifacts.require('KirsCode');

module.exports = function (_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(Kirs);
};
