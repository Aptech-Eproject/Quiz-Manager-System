# 📁 Project Structure

```
MiniProject/
├── 📄 docker-compose.yml          # Orchestration cho tất cả services
├── 📄 Makefile                    # Commands tiện lợi
├── 📄 setup.sh                    # Script setup tự động
├── 📄 check-health.sh             # Script kiểm tra health
├── 📄 README.md                   # Tài liệu chính
├── 📄 QUICKSTART.md               # Hướng dẫn nhanh
├── 📄 DEPLOYMENT.md               # Hướng dẫn deployment
│
├── 🎨 frontend/                   # React Frontend
│   ├── src/
│   │   ├── lib/                   # Axios, QueryClient
│   │   ├── services/              # API calls
│   │   ├── stores/                # State management
│   │   └── hooks/                 # Custom hooks
│   ├── Dockerfile
│   ├── nginx.conf                 # Nginx config cho SPA
│   └── .env
│
├── 🚪 gateway/                    # API Gateway
│   ├── src/
│   │   ├── config/
│   │   │   └── routes.js          # Proxy routes config
│   │   ├── middlewares/
│   │   │   └── logger.js
│   │   └── index.js
│   ├── Dockerfile
│   └── .env
│
├── 🔧 services/
│   │
│   ├── 🔐 auth-service/           # Authentication Service
│   │   ├── src/
│   │   │   ├── controllers/       # Request handlers
│   │   │   ├── middlewares/       # Auth middleware
│   │   │   ├── routes/            # API routes
│   │   │   ├── services/          # Business logic
│   │   │   ├── utils/             # Helpers
│   │   │   ├── validators/        # Request validation
│   │   │   └── index.js           # Entry point
│   │   ├── lib/
│   │   │   ├── bcrypt.js          # Password hashing
│   │   │   ├── jwt.js             # JWT utilities
│   │   │   └── response.js        # Response helpers
│   │   ├── config/
│   │   │   └── config.json        # Sequelize config
│   │   ├── models/                # Sequelize models
│   │   ├── migrations/            # DB migrations
│   │   ├── seeders/               # DB seeders
│   │   ├── Dockerfile
│   │   ├── .env
│   │   └── .env.example
│   │
│   ├── 🧠 quiz-service/           # Quiz Management Service
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── middlewares/
│   │   │   ├── models/            # Mongoose models
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── utils/
│   │   │   ├── validators/
│   │   │   └── index.js
│   │   ├── lib/
│   │   │   └── response.js
│   │   ├── Dockerfile
│   │   ├── .env
│   │   └── .env.example
│   │
│   └── 📊 result-service/         # Result Tracking Service
│       ├── src/
│       │   ├── controllers/
│       │   ├── middlewares/
│       │   ├── routes/
│       │   ├── services/
│       │   ├── utils/
│       │   ├── validators/
│       │   └── index.js
│       ├── lib/
│       │   └── response.js
│       ├── config/
│       │   └── config.json
│       ├── models/
│       ├── migrations/
│       ├── seeders/
│       ├── Dockerfile
│       ├── .env
│       └── .env.example
│
└── 🌐 nginx/                      # Nginx config (nếu cần)
    ├── Dockerfile
    └── nginx.conf
```

## 🗄️ Databases

### Auth Service - MySQL (Port 3307)
- Container: `auth-db`
- Database: `auth_db`
- User: `auth_user`
- Password: `auth_pass`

### Quiz Service - MongoDB (Port 27018)
- Container: `quiz-db`
- Database: `quiz_db`

### Result Service - MySQL (Port 3308)
- Container: `result-db`
- Database: `result_db`
- User: `result_user`
- Password: `result_pass`

## 🔌 Ports

| Service | Internal | External | URL |
|---------|----------|----------|-----|
| Frontend | 80 | 3000 | http://localhost:3000 | Prod
| Frontend | 80 | 5173 | http://localhost:5173 | Dev
| Gateway | 8000 | 8000 | http://localhost:8000 |
| Auth Service | 5000 | - | Internal only |
| Quiz Service | 5001 | - | Internal only |
| Result Service | 5002 | - | Internal only |
| Auth DB | 3306 | 3307 | localhost:3307 |
| Quiz DB | 27017 | 27018 | localhost:27018 |
| Result DB | 3306 | 3308 | localhost:3308 |
| phpMyAdmin | 80 | 8081 | http://localhost:8081 |

## 📚 Tech Stack

### Frontend
- React 18
- Vite
- TailwindCSS
- Axios
- React Query

### Backend Services
- Node.js 20
- Express 5
- Sequelize (MySQL)
- Mongoose (MongoDB)
- JWT
- bcryptjs
- express-validator

### Infrastructure
- Docker
- Docker Compose
- Nginx
- MySQL 8.0
- MongoDB 6

## 🔐 Security Features

- Helmet.js (Security headers)
- CORS configured
- JWT authentication
- Password hashing with bcrypt
- Request validation
- Environment variables

## 🚀 Performance

- Compression middleware
- Connection pooling
- Health checks
- Restart policies
- Resource limits (configurable)
