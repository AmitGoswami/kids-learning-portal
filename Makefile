# Makefile for Kids Math App

APP_NAME = kids-learning-portal
ENTRY = index.html
PORT = 8080
DIST = dist

.PHONY: clean build run deploy-gh deploy-netlify

## 🧹 Clean node_modules and build artifacts
clean:
	@echo "🧹 Cleaning project..."
	rm -rf node_modules package-lock.json $(DIST)
	@echo "✅ Clean complete."

## 📦 Install dependencies (live-server for local dev)
build:
	@echo "📦 Installing dev dependencies..."
	npm install live-server --save-dev
	@echo "✅ Build complete."

## 🏃 Run the app locally
run:
	@echo "🚀 Starting live-server at http://127.0.0.1:$(PORT)"
	npx live-server --port=$(PORT) --entry-file=$(ENTRY) --open=.

## 🌍 Deploy to GitHub Pages
deploy-gh:
	@echo "🌍 Deploying to GitHub Pages..."
	@echo "⚠️ Ensure you've committed all changes and set up gh-pages branch!"
	@echo "📦 Installing gh-pages if not already..."
	npm install gh-pages --save-dev
	@echo "📂 Preparing dist folder..."
	mkdir -p $(DIST)
	cp -r index.html style.css scripts assets $(DIST) 2>/dev/null || true
	@echo "🚀 Publishing to gh-pages..."
	npx gh-pages -d $(DIST)
	@echo "✅ Deployed to GitHub Pages!"

