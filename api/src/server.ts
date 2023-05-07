import App from "./app";
import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

const { app } = new App();

app.listen(PORT, () => {
  console.log(`Servidor executando na porta ${PORT}`);
});
