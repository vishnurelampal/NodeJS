import fetch from "node-fetch";

const AUTH =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVmlzaG51IFIiLCJlbWFpbCI6InZpc2hudXJlbGFtcGFsQGdtYWlsLmNvbSIsImRhdGUiOiIyMDI1LTEyLTA0IDE3OjI4OjMzIn0.naTz9T6ilrCJMT6NNMeSu65BU2biuGtFaSVmki5rvJE";

function decodeAnswersFromToken(token) {
  const payloadB64 = token.split(".")[0]; // first part
  // Convert base64url → base64
  const norm = payloadB64.replace(/-/g, "+").replace(/_/g, "/");
  const json = Buffer.from(norm, "base64").toString("utf8");
  const payload = JSON.parse(json);
  return payload.answers;
}

async function solve() {
  const headers = {
    Authorization: AUTH,
    Cookie: `auth_token=${AUTH}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  // 1) Get challenge
  const res = await fetch("https://workwithus.lucioai.com/logic-it-out", {
    method: "GET",
    headers,
  });

  const challenge = await res.json();
  console.log("📥 Challenge:", challenge);

  const { token } = challenge;

  // 2) Decode answers directly from token
  const answers = decodeAnswersFromToken(token);
  console.log("➡ Decoded answers from token:", answers);

  // 3) Submit within 5 seconds
  const submit = await fetch(
    "https://workwithus.lucioai.com/fastest-fingers-first",
    {
      method: "POST",
      headers,
      body: JSON.stringify({ token, answers }),
    }
  );

  console.log("🏁 Result:", await submit.json());
}

solve();
