#!/usr/bin/env bash
# Renders the social-preview image and the apple-touch-icon into public/.
# Needs: firefox (headless) and ImageMagick (magick).
set -euo pipefail
cd "$(dirname "$0")/../.."

profile=$(mktemp -d)
trap 'rm -rf "$profile"' EXIT

firefox --headless --no-remote --profile "$profile" --window-size 1200,630 \
  --screenshot "$PWD/public/og-default.png" "file://$PWD/scripts/og/og.html" >/dev/null 2>&1
magick public/og-default.png -crop 1200x630+0+0 +repage -strip -quality 92 public/og-default.png

# 180x180 icon: planet logo on the site's dark background
sed 's/#2f5f93/#7fb0e6/g' public/favicon.svg > "$profile/icon.svg"
magick -background '#0e1117' -density 1200 "$profile/icon.svg" -resize 132x132 \
  -gravity center -extent 180x180 -strip public/apple-touch-icon.png

identify public/og-default.png public/apple-touch-icon.png
