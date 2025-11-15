import { createProxyMiddleware } from "http-proxy-middleware";
import { authenticate } from "../middlewares/auth.js";
import dotenv from "dotenv";
dotenv.config();

export function registerProxies(app) {

  // --------------------------
  // PROTECTED AUTH ROUTES
  // --------------------------
  app.use(
    "/api/auth/profile",
    authenticate,
    createProxyMiddleware({
      target: process.env.AUTH_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: { "^/api/auth": "" },
      logLevel: "debug",
    })
  );

  app.use(
    "/api/auth/set-password",
    authenticate,
    createProxyMiddleware({
      target: process.env.AUTH_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: { "^/api/auth": "" },
      logLevel: "debug",
    })
  );

  // --------------------------
  // PUBLIC ROUTES – TÁCH RA TỪNG ROUTE
  // --------------------------
  app.use(
    "/api/auth/register",
    createProxyMiddleware({
      target: process.env.AUTH_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: { "^/api/auth": "" },
      logLevel: "debug",
    })
  );

  app.use(
    "/api/auth/login",
    createProxyMiddleware({
      target: process.env.AUTH_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: { "^/api/auth": "" },
      logLevel: "debug",
    })
  );

  app.use(
    "/api/auth/google-login",
    createProxyMiddleware({
      target: process.env.AUTH_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: { "^/api/auth": "" },
      logLevel: "debug",
    })
  );

  app.use(
    "/api/auth/refresh",
    createProxyMiddleware({
      target: process.env.AUTH_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: { "^/api/auth": "" },
      logLevel: "debug",
    })
  );

  app.use(
    "/api/auth/logout",
    createProxyMiddleware({
      target: process.env.AUTH_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: { "^/api/auth": "" },
      logLevel: "debug",
    })
  );

  app.use(
  "/api/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/auth": "" },
    logLevel: "debug",
  })
);


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
};
