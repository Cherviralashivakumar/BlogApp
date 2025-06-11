import React, { useState, useEffect, CSSProperties } from 'react';
import axios from 'axios';

interface Blog {
  id: string;
  title: string;
  content: string;
  author: { email: string };
  createdAt: string;
}

const Home: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const blogsPerPage = 6;
  const totalPages = Math.ceil(totalBlogs / blogsPerPage);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs`, {
          params: { page: currentPage, limit: blogsPerPage },
        });

        const data = response.data;
        setBlogs(data.blogs || []);
        setTotalBlogs(data.total || 0);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <div style={styles.homeContainer}>
      <div style={styles.homeHeader}>
        <h1 style={styles.headerTitle}>Welcome to BlogApp</h1>
        <p style={styles.headerDescription}>
          Discover amazing stories, insights, and ideas from our community of writers.
        </p>
      </div>

      {blogs.length === 0 ? (
        <div style={styles.loading}>No blogs found. Be the first to share your story!</div>
      ) : (
        <>
          <div style={styles.blogGrid}>
            {blogs.map((blog) => (
              <div key={blog.id} style={styles.blogCard}>
                <h3 style={styles.blogTitle}>{blog.title}</h3>
                <p style={styles.author}>By: {blog.author.email}</p>
                <p style={styles.content}>{blog.content.slice(0, 100)}...</p>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div style={styles.pagination}>
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} style={styles.pageButton}>
                ← Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  style={{
                    ...styles.pageButton,
                    ...(currentPage === page ? styles.activePage : {}),
                  }}
                >
                  {page}
                </button>
              ))}

              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} style={styles.pageButton}>
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Inline styles
const styles: { [key: string]: CSSProperties } = {
  homeContainer: {
    width: '100%',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  },
  homeHeader: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  headerTitle: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: '#333',
  },
  headerDescription: {
    fontSize: '1.1rem',
    color: '#666',
  },
  blogGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  blogCard: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 4px 8px rgba(0,0,0,0.06)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  blogTitle: {
    fontSize: '1.4rem',
    marginBottom: '0.5rem',
    color: '#222',
  },
  author: {
    fontSize: '0.9rem',
    color: '#888',
  },
  content: {
    marginTop: '0.5rem',
    fontSize: '0.95rem',
    color: '#555',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
    flexWrap: 'wrap',
    marginTop: '1rem',
  },
  pageButton: {
    padding: '0.6rem 1.2rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    backgroundColor: '#f9f9f9',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  activePage: {
    backgroundColor: '#007bff',
    color: '#fff',
    borderColor: '#007bff',
    fontWeight: 'bold',
  },
  loading: {
    textAlign: 'center',
    padding: '4rem',
    fontSize: '1.5rem',
    color: '#444',
  },
};

export default Home;
