require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const contactRoute = require("./routes/contactRoute");
const saleRoute = require("./routes/saleRoute");
const productTrashRoute = require("./routes/productTrashRoute");
const saleTrashRoute = require("./routes/saleTrashRoute");
const expenseRoute = require("./routes/ExpenseRoute");
const loanRoute = require("./routes/loanRoute");
const reportRoute = require("./routes/reportRoute");
const sampleRoute = require("./routes/sampleRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.static("uploads"));

// Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contactus", contactRoute);
app.use("/api/sale", saleRoute);
app.use("/api/trash", productTrashRoute);
app.use("/api/saletrash", saleTrashRoute);
app.use("/api/expense", expenseRoute);
app.use("/api/loan", loanRoute);
app.use("/api/report", reportRoute);
app.use("/sample", sampleRoute);

// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Error Middleware
app.use(errorHandler);
// Connect to DB and start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
