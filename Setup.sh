#!/bin/bash

echo "🚀 Mini CRM Backend - Quick Start Script"
echo "========================================"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "✅ .env file created. Please update it with your database credentials."
    echo ""
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npx prisma generate

# Run migrations
echo "🗃️  Running database migrations..."
npx prisma migrate dev --name init

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the server, run:"
echo "  npm run start:dev"
echo ""
echo "Access Swagger documentation at:"
echo "  http://localhost:3000/api/docs"
echo ""