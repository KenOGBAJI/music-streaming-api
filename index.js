require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./.vscode/routes/users");
const authRoutes = require("./.vscode/routes/auth");
const songRoutes = require("./.vscode/routes/songs");
const playlistRoutes = require("./.vscode/routes/playlist");
const searchRoutes = require("./.vscode/routes/search");
const app = express();

connection();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/login", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/playlist", playlistRoutes);
app.use("/api/search", searchRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`listening on port ${port}...`));
