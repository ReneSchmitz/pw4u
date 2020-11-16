const fs = require("fs").promises;

async function readMasterPassword() {
  return await fs.readFile("./.masterPassword", "utf8");
}

exports.readMasterPassword = readMasterPassword;
