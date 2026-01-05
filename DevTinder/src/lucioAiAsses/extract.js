const fs = require("fs");

// 1. Read the JSON response you saved from Postman
const raw = fs.readFileSync("sidequest.json", "utf8");
const data = JSON.parse(raw);

// 2. The "phone" field is already proper HTML *inside* the JSON
const phoneHtml = data.phone;

// 3. Write clean HTML to a file
fs.writeFileSync("phone.html", phoneHtml, "utf8");

console.log("phone.html written. Open it in the browser!");
const tokenCons =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVmlzaG51IFIiLCJlbWFpbCI6InZpc2hudXJlbGFtcGFsQGdtYWlsLmNvbSIsImRhdGUiOiIyMDI1LTEyLTA0IDE3OjI4OjMzIn0.naTz9T6ilrCJMT6NNMeSu65BU2biuGtFaSVmki5rvJE";
module.exports = { tokenCons };
// const tokenCons = require("./extract.js").tokenCons;
