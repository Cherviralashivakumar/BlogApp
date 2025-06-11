import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={styles.appContainer}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <nav style={styles.nav}>
            <Link to="/" style={styles.logo}>
              BlogApp
            </Link>

            <div style={styles.navLinks}>
              {user ? (
                <>
                  <Link to="/create">
                    <button style={styles.primaryButton}>Write</button>
                  </Link>
                  <span style={styles.userEmail}>{user.email}</span>
                  <button onClick={handleLogout} style={styles.secondaryButton}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button style={styles.primaryButton}>Login</button>
                  </Link>
                  <Link to="/signup">
                    <button style={styles.secondaryButton}>Sign Up</button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      <main style={styles.main}>{children}</main>
    </div>
  );
};

// Internal super excellent styles 😄
const styles: { [key: string]: React.CSSProperties } = {
  appContainer: {
    width: '100%',
    minHeight: '100vh',
    padding: 0,
    margin: 0,
    backgroundColor: '#f9fafb',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  },
  header: {
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  headerInner: {
    maxWidth: '1024px',
    margin: '0 auto',
    padding: '1rem',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: '#1f2937',
    textDecoration: 'none',
  },
  navLinks: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  primaryButton: {
    padding: '0.5rem 1.2rem',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    fontWeight: 500,
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  secondaryButton: {
    padding: '0.5rem 1.2rem',
    backgroundColor: '#fff',
    border: '1px solid #007bff',
    borderRadius: '6px',
    color: '#007bff',
    fontWeight: 500,
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  userEmail: {
    fontSize: '0.9rem',
    color: '#555',
  },
  main: {
    maxWidth: '1024px',
    margin: '0 auto',
    padding: '1.5rem 1rem',
  },
};

export default Layout;
