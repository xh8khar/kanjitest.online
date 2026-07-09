#!/usr/bin/env bash
# Build the site and publish dist/ to the gh-pages branch (GitHub Pages,
# legacy branch mode). Requires the xh8khar account active in gh:
#   gh auth switch -u xh8khar
set -euo pipefail
cd "$(dirname "$0")/.."

npm run build
touch dist/.nojekyll   # keep Pages from running Jekyll (it would drop _astro/)

cd dist
rm -rf .git
git init -q -b gh-pages
git add -A
git commit -qm "deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)"
git push -f https://github.com/xh8khar/kanjitest.online.git gh-pages
rm -rf .git
echo "✓ Deployed to gh-pages"
