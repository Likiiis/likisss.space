
set -euo pipefail
cd "$(dirname "$0")"

NAS="${NAS:-likisss@100.72.107.74}"   # over Tailscale
DEST="/opt/blog/public/"

npm run build
rsync -az --delete --human-readable --info=stats1 dist/ "$NAS:$DEST"
echo "Deployed → https://likisss.space"
