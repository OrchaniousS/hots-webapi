import express from "express";
import bodyParser from "body-parser";

import weeklyRoutes from "./routes/weekly.js";

const app = express();
const PORT = process.env.PORT || 8080;
app.use(bodyParser.json());

app.set("port", PORT);
app.use("/", weeklyRoutes);
app.get("/", (req, res) => {
  const htmlHolder = "<h1>Welcome to hots api</h1>";
  res.send(htmlHolder);
});
app.all("*", (req, res) =>
  res.send("You've tried reaching a route that doesn't exist.")
);

app.listen(app.get("port"), () => {
  console.log("app runing on port:" + PORT);
});
