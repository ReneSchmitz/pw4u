const CryptoJS = require("crypto-js");
const { collection } = require("./database");
const { readMasterPassword } = require("./masterPassword");

async function getPassword(passwordName) {
  const passwordDoc = await collection("passwords").findOne({
    name: passwordName,
  });
  if (!passwordDoc) {
    return null;
  }

  const passwordBytes = CryptoJS.AES.decrypt(
    passwordDoc.value,
    await readMasterPassword()
  );

  return passwordBytes.toString(CryptoJS.enc.Utf8);
}

async function setPassword(passwordName, newPasswordValue) {
  const encryptedValue = CryptoJS.AES.encrypt(
    newPasswordValue,
    await readMasterPassword()
  ).toString();

  await collection("passwords").updateOne(
    {
      name: passwordName,
    },
    {
      $set: {
        value: encryptedValue,
      },
    },
    {
      upsert: true,
    }
  );
}

async function deletePassword(passwordName) {
  return await collection("passwords").deleteOne({
    name: passwordName,
  });
}

exports.getPassword = getPassword;
exports.setPassword = setPassword;
exports.deletePassword = deletePassword;

// async function readPasswordSafe(name) {
//   const password = await collection("passwords").findOne({ name });
//   console.log(password);

//   return password;
// }
// async function deletePasswordSafe(name) {
//   const deletePassword = await collection("passwords").deleteOne({ name });
//   return deletePassword;
// }
// // async function readPasswordSafe(name) {
// //   const password = await collection("passwords").replaceOne({ name });

// //   return password;
// // }

// async function writePasswordSafe(passwordSafe) {
//   await fs.writeFile("./db.json", JSON.stringify(passwordSafe, null, 2));
// }
// async function getPassword(passwordName) {
//   const password = await readPasswordSafe(passwordName);
//   const deletePassword = await deletePasswordSafe(passwordName);
//   const passwordBytes = CryptoJS.AES.decrypt(
//     password.value,
//     await readMasterPassword()
//   );
//   return passwordBytes.toString(CryptoJS.enc.Utf8);
// }

// async function setPassword(passwordName, newPasswordValue) {
//   const encryptedValue = CryptoJS.AES.encrypt(
//     newPasswordValue,
//     await readMasterPassword()
//   ).toString();
//   await collection("passwords").insertOne({
//     name: passwordName,
//     value: encryptedValue,
//   });
// }

// exports.getPassword = getPassword;
// exports.setPassword = setPassword;
