#!/bin/bash

# Simple server startup script for Portal SPA

echo "🚀 Starting Portal SPA Server..."
echo "📍 Server will be available at: http://localhost:8000/spa-portal.html"
echo "🔧 Press Ctrl+C to stop the server"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "🐍 Using Python 3 HTTP Server"
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "🐍 Using Python HTTP Server"
    python -m http.server 8000
elif command -v php &> /dev/null; then
    echo "🐘 Using PHP Built-in Server"
    php -S localhost:8000
elif command -v node &> /dev/null; then
    echo "📦 Using Node.js serve (installing if needed)"
    npx serve . -l 8000
else
    echo "❌ No suitable server found. Please install Python, PHP, or Node.js"
    echo "   You can also use any other HTTP server to serve the files"
    exit 1
fi
