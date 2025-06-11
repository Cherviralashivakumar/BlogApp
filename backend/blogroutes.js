const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const filePath = path.join(__dirname, '../data/blogs.json');

function readBlogs() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data || '[]');
}

function writeBlogs(blogs) {
  fs.writeFileSync(filePath, JSON.stringify(blogs, null, 2));
}

// POST /api/blogs - Create a blog post
router.post('/', (req, res) => {
  const { title, content, authorId, createdAt, updatedAt } = req.body;

  if (!title || !content || !authorId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const blogs = readBlogs();
  const newBlog = {
    id: Date.now().toString(),
    title,
    content,
    author: { id: authorId, email: `user${authorId}@example.com` }, // Adjust as needed
    createdAt,
    updatedAt,
  };

  blogs.push(newBlog);
  writeBlogs(blogs);

  res.status(201).json(newBlog);
});

module.exports = router;
