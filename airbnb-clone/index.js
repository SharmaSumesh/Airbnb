require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

// requiring defined modules(files)
const rootRoutes = require("./routes/rootRoutes");
const authRoutes = require("./routes/authRoutes");
const hostRoutes = require("./routes/hostRoutes");
const roomRoutes = require("./routes/roomRoutes");
const bookRoutes = require("./routes/bookRoutes");

// Initialising app
const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setting view engine
app.set("view engine", "ejs");
app.set("views", "views");

// Settign public folder as express static folder
app.use(express.static("public"));

// Routes
// root routes
app.use("/", rootRoutes);
// user auth routes
app.use("/auth", authRoutes);
// host auth routes
app.use("/host/auth", authRoutes);
// host routes
app.use("/host", hostRoutes);
// room routes
app.use("/rooms", roomRoutes);
// book routes
app.use("/book", bookRoutes);
// logout
app.get("/logout", (req, res) => {
  res.clearCookie("auth-token");
  res.clearCookie("user");
  res.clearCookie("host");
  res.clearCookie("userType");
  res.redirect("/");
});

// PORT
const PORT = process.env.PORT || 5000;

// Server listening on PORT
app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
