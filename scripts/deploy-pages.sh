#!/usr/bin/env bash
# Manually trigger the GitHub Pages deploy workflow (pushes to main deploy
# automatically; this is only needed to re-deploy without a new commit).
set -euo pipefail
gh workflow run "Deploy to GitHub Pages" --repo xh8khar/kanjitest.online
gh run watch --repo xh8khar/kanjitest.online "$(sleep 3; gh run list --repo xh8khar/kanjitest.online --workflow deploy.yml --limit 1 --json databaseId --jq '.[0].databaseId')"
