import express from "express";
const app = express();
import "dotenv/config";
import cors from "cors";

const PORT = process.env.PORT || 2222;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
console.log(`Listening on PORT ${PORT}.`);
});