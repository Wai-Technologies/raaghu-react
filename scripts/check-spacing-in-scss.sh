#!/usr/bin/env bash
# check-spacing-in-scss.sh
# Governance script: counts hardcoded px spacing values in SCSS source files.
# Fails if the count exceeds the recorded baseline, preventing new spacing debt.
#
# Usage: bash scripts/check-spacing-in-scss.sh
# Baseline: scripts/spacing-baseline.txt

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
BASELINE_FILE="$SCRIPT_DIR/spacing-baseline.txt"

SCAN_DIRS=(
  "raaghu-elements"
  "raaghu-components"
  "raaghu-layouts"
)

# Matches padding/margin/gap with a bare px value (not inside var()).
# Uses leading context to avoid matching column-gap, row-gap, and CSS variable names.
SPACING_PATTERN='(^|[[:space:];{])(padding|margin|gap):[[:space:]]*[0-9]+px'

# ---------------------------------------------------------------------------
# Validate baseline file
# ---------------------------------------------------------------------------
if [[ ! -f "$BASELINE_FILE" ]]; then
  echo "ERROR: Baseline file not found at $BASELINE_FILE"
  echo "       Create it with: echo 106 > scripts/spacing-baseline.txt"
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

    # Count lines with hardcoded px spacing that are NOT using var(--rds),
    # NOT CSS variable definitions (lines starting with --), and NOT comments
    count=$(grep -E "$SPACING_PATTERN" "$scss_file" 2>/dev/null \
      | grep -v "var(--rds" \
      | grep -v "^\s*--" \
      | grep -v "^\s*//" \
      | grep -cv "^\s*/\*" || true)
    count="${count:-0}"

    if [[ "$count" -gt 0 ]]; then
      TOTAL=$((TOTAL + count))
      OFFENDING_FILES+=("$count	$scss_file")
    fi
  done < <(find "$TARGET" -name "*.scss" -print0)
done

# ---------------------------------------------------------------------------
# Report
# ---------------------------------------------------------------------------
echo "Spacing px scan complete"
echo "  Baseline : $BASELINE"
echo "  Current  : $TOTAL"
echo ""

if [[ "$TOTAL" -gt "$BASELINE" ]]; then
  DELTA=$((TOTAL - BASELINE))
  echo "FAIL: $DELTA new hardcoded px spacing value(s) detected (current=$TOTAL, baseline=$BASELINE)"
  echo ""
  echo "Offending files (file-level counts):"
  printf '%s\n' "${OFFENDING_FILES[@]}" | sort -rn | head -30
  echo ""
  echo "Fix: replace hardcoded px values with var(--rds-spacing-*) CSS custom properties."
  echo "     See raaghu-react-themes/tokens/design-tokens.ts for the spacing token scale."
  exit 1
fi

echo "PASS: No new spacing debt introduced (current=$TOTAL <= baseline=$BASELINE)"
exit 0
