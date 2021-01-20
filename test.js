const jwt = require("jsonwebtoken");
// console.log(
//   jwt.verify(
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImJpbGxib2FyZENsaWVudCIsImlhdCI6MTU5NDgwNzExMH0.Cx7bHGGBkj0TqZGCIdmkXBOl2rXeplsKHfYo5-KvEsM",
//     "your-256-bit-secret"
//   )
// );

console.log(
  jwt.sign(
    {
      secretNumber: "1234567890",
      name: "billboardClient",
    },
    "your-256-bit-secret"
  )
);
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWNyZXROdW1iZXIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImJpbGxib2FyZENsaWVudCIsImlhdCI6MTU5NDgwNzI2MX0.NeccYIXPPmJaSbRI2iYv_kVCbVLbHdXo6Px7TJWLucs