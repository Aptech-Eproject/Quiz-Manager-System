import { createProxyMiddleware } from "http-proxy-middleware";

export const registerProxies = (app) => {
  app.use(
    "/api/auth",
    createProxyMiddleware({
      target: process.env.AUTH_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: { "^/api/auth": "" },
      logLevel: "debug",
    })
  );

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
