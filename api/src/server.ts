import app from "./app";
import * as dotenv from "dotenv";
dotenv.config();

const PORT = Number(process.env.PORT);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
