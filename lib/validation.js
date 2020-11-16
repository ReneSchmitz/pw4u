const { readMasterPassword } = require("./masterPassword");

async function isMasterPasswordCorrect(masterPassword) {
  return masterPassword === (await readMasterPassword());
}

exports.isMasterPasswordCorrect = isMasterPasswordCorrect;
