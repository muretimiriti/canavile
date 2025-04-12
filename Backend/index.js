const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT;
const TokenRoute = require("./routes/token");  // Ensure correct path

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Mount the route with the correct path:
app.use("/token", TokenRoute);
