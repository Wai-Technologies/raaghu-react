#!/usr/bin/env bash
# check-hex-in-scss.sh
# Governance script: counts hardcoded hex color values in SCSS source files.
# Fails if the count exceeds the recorded baseline, preventing new style debt.
#
# Usage: bash scripts/check-hex-in-scss.sh
# Baseline: scripts/hex-baseline.txt

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
BASELINE_FILE="$SCRIPT_DIR/hex-baseline.txt"

SCAN_DIRS=(
  "raaghu-elements"
  "raaghu-components"
  "raaghu-layouts"
)

HEX_PATTERN='#[0-9a-fA-F]{3,8}'

# ---------------------------------------------------------------------------
# Validate baseline file
# ---------------------------------------------------------------------------
if [[ ! -f "$BASELINE_FILE" ]]; then
  echo "ERROR: Baseline file not found at $BASELINE_FILE"
  echo "       Run this script once with --set-baseline to create it."
  exit 1
fi

BASELINE=$(cat "$BASELINE_FILE" | tr -d '[:space:]')
if ! [[ "$BASELINE" =~ ^[0-9]+$ ]]; then
  echo "ERROR: Baseline file does not contain a valid integer (got: '$BASELINE')"
  exit 1
fi

# ---------------------------------------------------------------------------
# Scan SCSS files
# ---------------------------------------------------------------------------
TOTAL=0
OFFENDING_FILES=()

for dir in "${SCAN_DIRS[@]}"; do
  TARGET="$REPO_ROOT/$dir"
  if [[ ! -d "$TARGET" ]]; then
    echo "WARNING: Directory not found, skipping: $TARGET"
    continue
  fi

  while IFS= read -r -d '' scss_file; do
    # Exclude stories / test / spec files
    if echo "$scss_file" | grep -qE '(stories|test|spec)'; then
      continue
    fi

    count=$(grep -oE "$HEX_PATTERN" "$scss_file" 2>/dev/null | wc -l | tr -d '[:space:]') || count=0
    if [[ "$count" -gt 0 ]]; then
      TOTAL=$((TOTAL + count))
      OFFENDING_FILES+=("$count	$scss_file")
    fi
  done < <(find "$TARGET" -name "*.scss" -print0)
done

# ---------------------------------------------------------------------------
# Report
# ---------------------------------------------------------------------------
echo "Hex color scan complete"
echo "  Baseline : $BASELINE"
echo "  Current  : $TOTAL"
echo ""

if [[ "$TOTAL" -gt "$BASELINE" ]]; then
  DELTA=$((TOTAL - BASELINE))
  echo "FAIL: $DELTA new hardcoded hex color(s) detected (current=$TOTAL, baseline=$BASELINE)"
  echo ""
  echo "Offending files (file-level counts):"
  printf '%s\n' "${OFFENDING_FILES[@]}" | sort -rn | head -30
  echo ""
  echo "Fix: replace hardcoded hex values with --rds-* CSS custom properties."
  echo "     See raaghu-react-themes/src/tokens/ and packages/raaghu-design-tokens/README.md"
  exit 1
fi

echo "PASS: No new hex color debt introduced (current=$TOTAL <= baseline=$BASELINE)"
exit 0
