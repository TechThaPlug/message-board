const express = require("express");
const messageRouter = require("./routes/messageRouter");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use("/", messageRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Message Board running at http://localhost:${PORT}`);
});
