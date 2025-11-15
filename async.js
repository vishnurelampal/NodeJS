const crypto = require("node:crypto");
console.log("start");
crypto.pbkdf2Sync("vishnu", "salt", 5000000, 50, "sha512");
console.log("key generated and moved to next line");
