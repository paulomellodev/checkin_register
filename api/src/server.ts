import * as dotenv from "dotenv";
import { app } from "./app";
dotenv.config();

const PORT = Number(process.env.PORT) || 3030;

app.express.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
