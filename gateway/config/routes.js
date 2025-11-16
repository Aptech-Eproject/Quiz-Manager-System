import { createProxyMiddleware } from "http-proxy-middleware";
import { authenticate } from "../middlewares/auth.js";
import dotenv from "dotenv";
dotenv.config();

const authProxy = createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL,
  changeOrigin: true,
  logLevel: "debug",
  pathRewrite: (_path, req) => req.originalUrl,
});

export function registerProxies(app) {
  // --------------------------
  // PROTECTED AUTH ROUTES
  // --------------------------
  app.use("/api/auth/profile", authenticate, authProxy);
  app.use("/api/auth/set-password", authenticate, authProxy);

  // --------------------------
  // PUBLIC AUTH ROUTES
  // --------------------------
  app.use("/api/auth", authProxy);

  // --------------------------
  // QUIZ & RESULT
  // --------------------------
  app.use(
    "/api/quiz",
    createProxyMiddleware({
      target: process.env.QUIZ_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: { "^/api/quiz": "" },
      logLevel: "debug",
    })
  );

  app.use(
    "/api/result",
    createProxyMiddleware({
      target: process.env.RESULT_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: { "^/api/result": "" },
      logLevel: "debug",
    })
  );
}
