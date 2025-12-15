#!/bin/bash

echo "🚀 Setting up Quiz Application..."

if [ ! -f archive/frontendOld/.env ]; then
  cp archive/frontendOld/.env.example archive/frontendOld/.env
  echo "✅ Created archive/frontendOld/.env"
fi
# Copy .env files if not exist
if [ ! -f backend/api-gateway/.env ]; then
  cp container/env/gateway.env.example backend/api-gateway/.env
  echo "✅ Created backend/api-gateway/.env"
fi

if [ ! -f backend/auth-service/.env ]; then
  cp container/env/auth.env.example backend/auth-service/.env
  echo "✅ Created backend/auth-service/.env"
fi

if [ ! -f backend/quiz-service/.env ]; then
  cp container/env/quiz.env.example backend/quiz-service/.env
  echo "✅ Created backend/quiz-service/.env"
fi

if [ ! -f backend/result-service/.env ]; then
  cp container/env/result.env.example backend/result-service/.env
  echo "✅ Created backend/result-service/.env"
fi

echo ""
echo "✅ Setup complete!"
echo ""
