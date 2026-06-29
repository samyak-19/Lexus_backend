require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRoutes =  require("./src/routes/auth.routes");
const authMiddleware =  require("./src/middleware/auth.middleware");
const companyRoutes = require("./src/routes/company.routes")

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/company", companyRoutes);


app.get("/", (req, res) => {
  res.json({
    message: "SmartERP API Running"
  });
});

app.get("/test" , authMiddleware,(req , res) =>{
  res.json({
    message: "Protected Route",
  });
});

app.get("/profile", authMiddleware,(req ,res)=>{
  res.status(200).json({
    success: true,
    message: "Profile fetch successfully",
    user : req.user,
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});