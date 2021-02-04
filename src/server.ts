import express from "express";

const app = express();

app.use(express.json());

app.listen(3030, () => {
  console.log("Listening to 3030");
});
