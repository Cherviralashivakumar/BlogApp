import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import cors from 'cors';
import path from 'path';

const app = express();
app.use(cors());
const PORT = 5000;

app.use(bodyParser.json());

const BLOGS_FILE = './data/blogs.json';

// Read blogs
function readBlogs() {
  if (!fs.existsSync(BLOGS_FILE)) return [];
  const data = fs.readFileSync(BLOGS_FILE, 'utf-8');
  return JSON.parse(data || '[]');
}

// Write blogs
function writeBlogs(blogs) {
  fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2));
}

// GET /api/blogs (with pagination)
app.get('/api/blogs', (req, res) => {
  const blogs = readBlogs();
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;

  const startIndex = (page - 1) * limit;
  const paginatedBlogs = blogs.slice(startIndex, startIndex + limit);

  res.json({
    blogs: paginatedBlogs,
    total: blogs.length,
  });
});

// POST /api/blogs (create new blog)
app.post('/api/blogs', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const blogs = readBlogs();

  const newBlog = {
    id: Date.now().toString(),
    title,
    content,
    author: { email: "defaultuser@example.com" }, // You can customize this later
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  blogs.push(newBlog);
  writeBlogs(blogs);

  res.status(201).json(newBlog);
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
