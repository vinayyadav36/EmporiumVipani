#!/bin/bash

# EmproiumVipani Build Script for GitHub Pages
# Handles proper deployment to GitHub Pages with correct base path

echo "🔨 Building EmproiumVipani for GitHub Pages..."
echo

# Step 1: Remove old build
rm -rf dist

# Step 2: Copy public folder to dist (simple copy for static site)
echo "📁 Building from public/ to dist/..."
cp -r public dist

# Step 3: Update base paths in HTML for GitHub Pages
echo "🔗 Updating asset paths for GitHub Pages..."
if [ -f "dist/index.html" ]; then
  # Update any root-relative paths to include /EmporiumVipani/
  sed -i 's|href="/|href="/EmporiumVipani/|g' dist/index.html
  sed -i 's|src="/|src="/EmporiumVipani/|g' dist/index.html
  # But preserve the already correct paths
  sed -i 's|/EmporiumVipani/EmporiumVipani/|/EmporiumVipani/|g' dist/index.html
fi

# Step 4: Verify critical files
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
echo "📍 Base URL: https://vinayyadav36.github.io/EmporiumVipani/"
