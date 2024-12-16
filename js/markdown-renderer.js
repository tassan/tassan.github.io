document.addEventListener("DOMContentLoaded", async () => {
  const postContainer = document.getElementById("post-container");

  try {
    // Fetch list of markdown posts dynamically
    const posts = fetchPosts();

    for (const post of posts) {
      const markdown = await fetchMarkdown(post);
      const { metadata, content } = parseMetadata(markdown);
      const postHtml = convertMarkdownToHtml(content);

      // Create a new article for each post
      const article = document.createElement("article");
      article.innerHTML = `
        <h2>${metadata.title || "Untitled Post"}</h2>
        <p><small>By ${metadata.author || "Unknown Author"} on ${
        metadata.date || "Unknown Date"
      }</small></p>
        <hr>
        ${postHtml}
      `;
      postContainer.appendChild(article);
    }
  } catch (error) {
    console.error("Error loading posts:", error);
    postContainer.textContent = "Failed to load posts.";
  }
});

// Function to dynamically read markdown files from the /posts directory
function fetchPosts() {
  const posts = [];
  const req = require.context("../posts", false, /\.md$/);
  req.keys().forEach((key) => posts.push(req(key)));
  return posts;
}

// Fetch and return markdown content as text
async function fetchMarkdown(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch ${url}`);
  return await response.text();
}

// Parse YAML front matter metadata and extract content
function parseMetadata(markdown) {
  const metadataRegex = /^---\n([\s\S]+?)\n---/; // Matches YAML front matter
  const match = markdown.match(metadataRegex);

  let metadata = {};
  let content = markdown;

  if (match) {
    const yaml = match[1];
    yaml.split("\n").forEach((line) => {
      const [key, ...value] = line.split(":");
      if (key && value) {
        metadata[key.trim()] = value.join(":").trim();
      }
    });
    content = markdown.replace(metadataRegex, "").trim(); // Remove metadata from content
  }

  return { metadata, content };
}

// Simple Markdown-to-HTML converter
function convertMarkdownToHtml(markdown) {
  return markdown
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\n/g, "<br>");
}
