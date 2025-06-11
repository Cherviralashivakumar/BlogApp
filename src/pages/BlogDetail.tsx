import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;

      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/blogs/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog');
        }
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        setError('Failed to load blog post.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (!blog || !window.confirm('Are you sure you want to delete this blog post?')) return;

    setIsDeleting(true);
    setError(null);
    try {
      const response = await fetch(`/api/blogs/${blog.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        navigate('/');
      } else {
        setError('Failed to delete blog post.');
      }
    } catch {
      setError('An error occurred while deleting the blog post.');
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isAuthor = user && blog && user.id === blog.author.id;

  if (isLoading) {
    return <p style={{ textAlign: 'center' }}>Loading...</p>;
  }

  if (!blog) {
    return (
      <div style={styles.centerBox}>
        <h2>Blog post not found</h2>
        <p>The blog post you're looking for doesn't exist or has been removed.</p>
        <Link to="/" style={styles.backLink}>← Back to Home</Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.backButtonBox}>
        <Link to="/" style={styles.backLink}>← Back to Home</Link>
      </div>

      <h1 style={styles.title}>{blog.title}</h1>

      <div style={styles.metaBox}>
        <div>By: <b>{blog.author.email}</b></div>
        <div>Published: {formatDate(blog.createdAt)}</div>
        {blog.createdAt !== blog.updatedAt && <div>Updated: {formatDate(blog.updatedAt)}</div>}
      </div>

      {isAuthor && (
        <div style={styles.actions}>
          <Link to={`/edit/${blog.id}`}>
            <button style={styles.editButton}>Edit</button>
          </Link>
          <button 
            onClick={handleDelete} 
            disabled={isDeleting}
            style={styles.deleteButton}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      )}

      {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

      <div style={styles.contentBox}>
        {blog.content.split('\n').map((para: string, index: number) => (
          <p key={index} style={styles.paragraph}>
            {para}
          </p>
        ))}
      </div>
    </div>
  );
};

// ✅ Nice clean CSS styles:
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
    maxWidth: '900px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    boxSizing: 'border-box',
  },
  backButtonBox: {
    marginBottom: '20px'
  },
  backLink: {
    textDecoration: 'none',
    color: '#3498db',
    fontWeight: 'bold'
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333'
  },
  metaBox: {
    fontSize: '0.9rem',
    color: '#555',
    marginBottom: '20px'
  },
  actions: {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px'
  },
  editButton: {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  deleteButton: {
    padding: '10px 20px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  contentBox: {
    fontSize: '1rem',
    lineHeight: '1.7',
    color: '#333'
  },
  paragraph: {
    marginBottom: '1rem'
  },
  centerBox: {
    textAlign: 'center',
    padding: '3rem'
  }
};

export default BlogDetail;
