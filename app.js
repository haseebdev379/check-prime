const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();

function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

app.post("/functions/check-prime", (req, res) => {
  const { input } = req.body;
  if (typeof input !== "number") {
    return res
      .status(400)
      .json({ error: "Invalid input. Provide a valid number." });
  }

  const result = isPrime(input);
  res.json({ output: result });
});

app.get("/functions/check-prime", (req, res) => {
  const docs = {
    name: "check-prime",
    description: "Check if a given number is prime.",
    input: {
      type: "number",
      description: "The number to check for primality.",
      example: 17,
    },
    output: {
      type: "boolean",
      description: "Returns true if the number is prime, false otherwise.",
      example: true,
    },
  };

  res.json(docs);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
