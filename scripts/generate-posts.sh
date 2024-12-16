#!/bin/bash

# Script to generate posts.json with all markdown files in the /posts folder
# Falls back to Bash-only implementation if 'jq' is unavailable

# Variables
POSTS_DIR="./posts"
OUTPUT_FILE="./posts.json"

# Function to display error messages and exit
error_exit() {
    echo -e "\e[31mError: $1\e[0m"  # Red text
    read -p "Press [Enter] to exit..."  # Pause
    exit 1
}

# Check if the posts directory exists
if [ ! -d "$POSTS_DIR" ]; then
    error_exit "The directory '$POSTS_DIR' does not exist. Please create it."
fi

# Function to generate posts.json with jq
generate_with_jq() {
    echo "Using 'jq' to generate posts.json..."
    find "$POSTS_DIR" -type f -name "*.md" | sort | jq -R -s -c 'split("\n") | map(select(length > 0))' > "$OUTPUT_FILE"
}

# Function to generate posts.json using Bash-only tools
generate_with_bash() {
    echo "Using Bash tools to generate posts.json..."
    printf "[\n" > "$OUTPUT_FILE"
    find "$POSTS_DIR" -type f -name "*.md" | sort | awk '{printf "  \"%s\",\n", $0}' | sed '$ s/,$//' >> "$OUTPUT_FILE"
    printf "]\n" >> "$OUTPUT_FILE"
}

# Check for jq and fall back if not present
if command -v jq &>/dev/null; then
    generate_with_jq
else
    echo -e "\e[33mWarning: 'jq' is not installed. Falling back to Bash tools.\e[0m"
    generate_with_bash
fi

# Verify success and display output
if [ $? -eq 0 ]; then
    echo -e "\e[32mSuccess: '$OUTPUT_FILE' has been updated.\e[0m"  # Green text
    echo "Contents of '$OUTPUT_FILE':"
    cat "$OUTPUT_FILE"
else
    error_exit "Failed to generate '$OUTPUT_FILE'."
fi

# Pause to display results
echo -e "\nScript execution completed."
read -p "Press [Enter] to exit..."
