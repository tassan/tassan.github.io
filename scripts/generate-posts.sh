#!/bin/bash

# Script to generate posts.json with all markdown files in the /posts folder

POSTS_DIR="./posts"
OUTPUT_FILE="./posts.json"

# Find all markdown files in the /posts folder and write to posts.json
echo "Generating posts.json..."
find "$POSTS_DIR" -type f -name "*.md" | sort | jq -R -s -c 'split("\n") | map(select(length > 0))' > "$OUTPUT_FILE"

echo "posts.json has been updated:"
cat "$OUTPUT_FILE"
