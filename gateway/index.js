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
app.use(express.json());

// Đăng ký các route proxy
registerProxies(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Quiz App - API Gateway</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .container {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          max-width: 600px;
          width: 100%;
          padding: 50px 40px;
          text-align: center;
        }
        .logo {
          font-size: 4rem;
          margin-bottom: 20px;
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        h1 {
          color: #667eea;
          font-size: 2.5rem;
          margin-bottom: 10px;
        }
        .status {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #10b981;
          color: white;
          padding: 8px 20px;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 600;
          margin: 20px 0;
        }
        .status::before {
          content: '';
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        .subtitle {
          color: #6b7280;
          font-size: 1.1rem;
          margin-bottom: 30px;
        }
        .services {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-top: 40px;
        }
        .service {
          text-align: center;
        }
        .service-icon {
          font-size: 3rem;
          margin-bottom: 10px;
          transition: transform 0.3s;
        }
        .service:hover .service-icon {
          transform: scale(1.2) rotate(5deg);
        }
        .service-name {
          color: #374151;
          font-size: 0.9rem;
          font-weight: 600;
        }
        .footer {
          margin-top: 40px;
          padding-top: 30px;
          border-top: 1px solid #e5e7eb;
          color: #9ca3af;
          font-size: 0.85rem;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">🚪</div>
        <h1>API Gateway</h1>
        <div class="status">ONLINE</div>
        <p class="subtitle">Quiz Application Microservices</p>
        
        <div class="services">
          <div class="service">
            <div class="service-icon">🔐</div>
            <div class="service-name">Auth</div>
          </div>
          <div class="service">
            <div class="service-icon">🧠</div>
            <div class="service-name">Quiz</div>
          </div>
          <div class="service">
            <div class="service-icon">📊</div>
            <div class="service-name">Result</div>
          </div>
        </div>

        <div class="footer">
          Powered by Node.js & Express
        </div>
      </div>
    </body>
    </html>
  `);
});


