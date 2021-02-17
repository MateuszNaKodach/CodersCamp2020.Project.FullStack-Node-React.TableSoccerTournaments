import express from "express";

const app = express();

const port = process.env.REST_API_PORT || 5000;

app.listen(port, () => {
  console.log(`[App]: Listening on port ${port}`)
})
