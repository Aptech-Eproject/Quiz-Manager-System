#!/bin/bash

echo "🏥 Checking services health..."
echo ""

check_service() {
  local name=$1
  local url=$2
  
  if curl -s -f "$url" > /dev/null 2>&1; then
    echo "✅ $name is healthy"
  else
    echo "❌ $name is not responding"
  fi
}

check_service "Gateway" "http://localhost:8000"
check_service "Auth Service" "http://localhost:8000/api/auth/health"
check_service "Quiz Service" "http://localhost:8000/api/quiz/health"
check_service "Result Service" "http://localhost:8000/api/result/health"
check_service "Frontend" "http://localhost:5173"
check_service "phpMyAdmin" "http://localhost:8081"

echo ""
echo "📊 Container status:"
docker-compose ps
