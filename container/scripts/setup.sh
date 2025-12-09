#!/bin/bash

echo "🚀 Setting up Quiz Application..."

# Copy .env files if not exist
if [ ! -f frontend/.env ]; then
  cp frontend/.env.example frontend/.env
  echo "✅ Created frontend/.env"
fi

if [ ! -f gateway/.env ]; then
  cp gateway/.env.example gateway/.env
  echo "✅ Created gateway/.env"
fi

if [ ! -f services/auth-service/.env ]; then
  cp services/auth-service/.env.example services/auth-service/.env
  echo "✅ Created services/auth-service/.env"
fi

if [ ! -f services/quiz-service/.env ]; then
  cp services/quiz-service/.env.example services/quiz-service/.env
  echo "✅ Created services/quiz-service/.env"
fi

if [ ! -f services/result-service/.env ]; then
  cp services/result-service/.env.example services/result-service/.env
  echo "✅ Created services/result-service/.env"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Run: docker-compose up -d"
