#!/bin/bash

# EmproiumVipani Build Script for GitHub Pages
# Deploys to https://vinayyadav36.github.io/EmporiumVipani/src/

echo "🔨 Building EmproiumVipani for GitHub Pages..."
echo

# Step 1: Remove old build
rm -rf dist

# Step 2: Create dist/src directory
mkdir -p dist/src

# Step 3: Copy public folder to dist/src
echo "📁 Building from public/ to dist/src/..."
cp -r public/* dist/src/

# Step 4: Verify critical files
echo "✅ Verifying files..."
for file in index.html app.js components.js email-config.js styles.css manifest.json sw.js favicon.svg icon-192.png icon-512.png; do
    if [ -f "dist/src/$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ $file (MISSING)"
    fi
done

echo
echo "📊 Build Summary:"
du -sh dist
echo "Total files: $(find dist -type f | wc -l)"
echo
echo "✅ Build complete!"
echo "📦 Output: dist/src/"
echo "🚀 Ready to deploy to GitHub Pages"
echo "📍 Base URL: https://vinayyadav36.github.io/EmporiumVipani/src/"
