require("dotenv").config();
const { readCommandLineArguments } = require("./lib/commandLine");
const { connect, close } = require("./lib/database");
const { getPassword, setPassword } = require("./lib/passwords");
const { askForMasterPassword } = require("./lib/questions");
const { isMasterPasswordCorrect } = require("./lib/validation");

async function run() {
  try {
    console.log("Connecting to database...");
    await connect(process.env.MONGO_DB_URI, process.env.MONGO_DB_NAME);
    console.log("Connected to database 🎉");
    const masterPassword = await askForMasterPassword();

    if (!(await isMasterPasswordCorrect(masterPassword))) {
      console.error("You are not welcome here! 👿 Try again!");
      return run();
    }

    const [passwordName, newPasswordValue] = readCommandLineArguments();
    if (!passwordName) {
      console.error("Missing password name!");
      return process.exit(9);
    }

    if (newPasswordValue) {
      await setPassword(passwordName, newPasswordValue);
      console.log(`Password ${passwordName} set 🎉`);
    } else {
      const passwordValue = await getPassword(passwordName);
      console.log(`Your password is ${passwordValue} 🎉`);
    }
  } catch (error) {
    if (error.message.match("E11000")) {
      console.error("DUPLICATE KEY JO!");
    } else {
      console.error(error);
    }
  } finally {
    await close();
  }
}

//   console.log("Connecting to database...");
//   await connect(
//     "mongodb+srv://Rene:vWsv4VcyWszk5KYo@cluster0.oloe7.mongodb.net/pw4u?retryWrites=true&w=majority",
//     "pw4u"
//   );
//   console.log("Connected to database 🎉");

//   const masterPassword = await askForMasterPassword();

//   if (!isMasterPasswordCorrect(masterPassword)) {
//     console.error("You are not welcome here! 👿 Try again!");
//     return run();
//   }
//   const [passwordName, newPasswordValue] = readCommandLineArguments();
//   if (!passwordName) {
//     console.error("Missing password name!");
//     return process.exit(9);
//   }
//   if (newPasswordValue) {
//     await setPassword(passwordName, newPasswordValue);
//     console.log(`Password ${passwordName} set 🎉`);
//   } else {
//     const passwordValue = await getPassword(passwordName);
//     console.log(`Your password is ${passwordValue} 🎉`);
//   }
//   close();
// }

run();
