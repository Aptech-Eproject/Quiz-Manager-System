import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { registerProxies } from "./config/routes.js";
import { requestLogger } from "./middlewares/logger.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(requestLogger);
app.get("/", (req, res) => {
  res.send("Gateway is running");
});
const PORT = process.env.PORT || 8000;
// Đăng ký các route proxy
registerProxies(app);

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on port ${PORT}`);
});
