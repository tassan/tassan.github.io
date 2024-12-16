// markdown-renderer.js

document.addEventListener("DOMContentLoaded", async () => {
  const postContainer = document.getElementById("post-container");

  try {
    // List of markdown posts to render (you can make this dynamic or fetch from an API)
    const posts = fetchPosts();

    for (const post of posts) {
      const response = await fetch(post);
      if (!response.ok) throw new Error(`Failed to fetch ${post}`);
      const markdown = await response.text();
      const postHtml = convertMarkdownToHtml(markdown);

      // Create a new article for the post
      const article = document.createElement("article");
      article.innerHTML = postHtml;
      postContainer.appendChild(article);
    }
  } catch (error) {
    console.error("Error loading posts:", error);
    postContainer.textContent = "Failed to load posts.";
  }
});

// Read /posts directory and fetch all markdown files
function fetchPosts() {
  const posts = [];
  const req = require.context("../posts", false, /\.md$/);
  req.keys().forEach((key) => posts.push(req(key)));
  return posts;
}

// Simple Markdown to HTML converter (you can use libraries like marked.js or showdown.js for more features)
function convertMarkdownToHtml(markdown) {
  return markdown
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/\n/g, "<br>");
}
