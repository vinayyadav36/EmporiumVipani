#!/bin/bash

# EmproiumVipani Build Script for GitHub Pages
# Handles proper deployment to GitHub Pages with correct base path

echo "🔨 Building EmproiumVipani for GitHub Pages..."
echo

# Step 1: Create dist directory
mkdir -p dist

# Step 2: Copy public folder to dist
echo "📁 Copying public assets..."
cp -r public/* dist/

# Step 3: Verify critical files
echo "✅ Verifying files..."
for file in index.html app.js components.js email-config.js styles.css manifest.json sw.js favicon.svg icon-192.png icon-512.png; do
    if [ -f "dist/$file" ]; then
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
echo "📦 Output: dist/"
echo "🚀 Ready to deploy to GitHub Pages"
