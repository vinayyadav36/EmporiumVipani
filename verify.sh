#!/bin/bash

# EmproiumVipani - Project Verification Script
# Checks all fixes and confirms project is ready to run

echo "╔════════════════════════════════════════════════════════════╗"
echo "║     EmproiumVipani - Project Verification Report           ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PASS_COUNT=0
FAIL_COUNT=0

# Function to check file exists
check_file() {
    local file=$1
    local description=$2
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $description: $file"
        ((PASS_COUNT++))
    else
        echo -e "${RED}✗${NC} $description: $file (MISSING)"
        ((FAIL_COUNT++))
    fi
}

# Function to check content
check_content() {
    local file=$1
    local pattern=$2
    local description=$3
    if grep -q "$pattern" "$file" 2>/dev/null; then
        echo -e "${GREEN}✓${NC} $description"
        ((PASS_COUNT++))
    else
        echo -e "${RED}✗${NC} $description (NOT FOUND in $file)"
        ((FAIL_COUNT++))
    fi
}

cd /workspaces/EmporiumVipani

echo "📂 CHECKING FILE STRUCTURE"
echo "─────────────────────────────────────────────────────────────"
check_file "public/index.html" "Main HTML"
check_file "public/app.js" "App JavaScript"
check_file "public/components.js" "Components"
check_file "public/email-config.js" "Email Config"
check_file "public/styles.css" "Stylesheet"
check_file "public/favicon.svg" "SVG Favicon"
check_file "public/icon-192.png" "Icon 192x192"
check_file "public/icon-512.png" "Icon 512x512"
check_file "public/manifest.json" "PWA Manifest"
check_file "public/sw.js" "Service Worker"
echo

echo "🔗 CHECKING HTML SCRIPT REFERENCES"
echo "─────────────────────────────────────────────────────────────"
check_content "public/index.html" "src=\"components.js\"" "components.js referenced correctly"
check_content "public/index.html" "src=\"email-config.js\"" "email-config.js referenced correctly"
check_content "public/index.html" "src=\"app.js\"" "app.js referenced correctly"
check_content "public/index.html" "href=\"styles.css\"" "styles.css referenced correctly"
check_content "public/index.html" "href=\"favicon.svg\"" "favicon.svg referenced correctly"
echo

echo "❌ VERIFYING NO BAD PATHS"
echo "─────────────────────────────────────────────────────────────"
if grep -q "src=\"/src/" public/index.html; then
    echo -e "${RED}✗${NC} Found incorrect path: /src/"
    ((FAIL_COUNT++))
else
    echo -e "${GREEN}✓${NC} No incorrect /src/ paths found"
    ((PASS_COUNT++))
fi

if grep -q "src=\"src/" public/index.html; then
    echo -e "${RED}✗${NC} Found incorrect path: src/"
    ((FAIL_COUNT++))
else
    echo -e "${GREEN}✓${NC} No incorrect src/ paths found"
    ((PASS_COUNT++))
fi
echo

echo "⚙️  CHECKING ALPINE.JS SETUP"
echo "─────────────────────────────────────────────────────────────"
check_content "public/index.html" "alpinejs" "Alpine.js CDN loaded"
check_content "public/index.html" "x-data=\"appData()\"" "Alpine.js data initialization"
check_content "public/index.html" "x-init=\"init()\"" "Alpine.js init function"
echo

echo "🎨 CHECKING CSS SETUP"
echo "─────────────────────────────────────────────────────────────"
check_content "public/index.html" "tailwindcss" "Tailwind CSS loaded"
check_content "public/styles.css" ":root" "Custom CSS variables defined"
echo

echo "📧 CHECKING EMAIL CONFIG"
echo "─────────────────────────────────────────────────────────────"
check_content "public/index.html" "emailjs" "EmailJS library loaded"
check_content "public/email-config.js" "EmailConfig" "Email config object defined"
echo

echo "📦 CHECKING PWA CONFIGURATION"
echo "─────────────────────────────────────────────────────────────"
check_content "public/manifest.json" "icon-192.png" "192px icon in manifest"
check_content "public/manifest.json" "icon-512.png" "512px icon in manifest"
check_content "public/manifest.json" "EmproiumVipani" "App name in manifest"
echo

echo "🔧 CHECKING JAVASCRIPT FUNCTIONS"
echo "─────────────────────────────────────────────────────────────"
check_content "public/app.js" "function appData()" "appData function defined"
check_content "public/app.js" "async init()" "init function defined"
check_content "public/app.js" "this.store.products" "Product store defined"
echo

echo "📊 CHECKING FILE SIZES"
echo "─────────────────────────────────────────────────────────────"
for file in public/index.html public/app.js public/components.js public/email-config.js public/styles.css; do
    if [ -f "$file" ]; then
        size=$(du -h "$file" | cut -f1)
        echo -e "${GREEN}✓${NC} $(basename $file): $size"
        ((PASS_COUNT++))
    fi
done
echo

echo "═════════════════════════════════════════════════════════════"
echo "📋 SUMMARY"
echo "═════════════════════════════════════════════════════════════"
echo -e "Passed: ${GREEN}$PASS_COUNT${NC}"
echo -e "Failed: ${RED}$FAIL_COUNT${NC}"
echo

if [ $FAIL_COUNT -eq 0 ]; then
    echo -e "${GREEN}✅ ALL CHECKS PASSED - Project is ready!${NC}"
    echo
    echo "🚀 Quick Start:"
    echo "   cd /workspaces/EmporiumVipani/public"
    echo "   python3 -m http.server 8000"
    echo "   # Open http://localhost:8000"
    exit 0
else
    echo -e "${RED}❌ SOME CHECKS FAILED - Please review above${NC}"
    exit 1
fi
