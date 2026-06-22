const express = require("express");
const cors = require("cors");
const authRoutes =  require("./src/routes/auth.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "SmartERP API Running"
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});