// Responsive Navbar with Ant Design - mobile drawer menu
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

const { Header } = Layout;

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'ADMIN';
  const isLoggedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // after clearing session redirect to login page so user cannot accidentally stay on a protected route
    navigate('/login');
    setDrawerOpen(false);
  };

  const menuItems = [
    { key: '/', label: <Link to="/" onClick={() => setDrawerOpen(false)}>Home</Link> },
    { key: '/products', label: <Link to="/products" onClick={() => setDrawerOpen(false)}>Products</Link> },
    { key: '/about', label: <Link to="/about" onClick={() => setDrawerOpen(false)}>About</Link> },
    { key: '/tips', label: <Link to="/tips" onClick={() => setDrawerOpen(false)}>Tips</Link> },
    { key: '/contact', label: <Link to="/contact" onClick={() => setDrawerOpen(false)}>Contact</Link> },
    ...(isLoggedIn && isAdmin ? [{ key: '/admin', label: <Link to="/admin" onClick={() => setDrawerOpen(false)}>Dashboard</Link> }] : []),
    ...(isLoggedIn ? [{ key: 'logout', label: <span onClick={handleLogout}>Logout</span> }] : [{ key: '/login', label: <Link to="/login" onClick={() => setDrawerOpen(false)}>Login</Link> }])
  ];

  return (
    <Header style={{ position: 'sticky', top: 0, zIndex: 100, display: 'flex', alignItems: 'center', padding: '0 16px', background: '#2d5a27' }}>
      <Link to="/" style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem', marginRight: 'auto' }}>
        🌿 Jivdaya Agro Mart
      </Link>
      {/* Desktop menu - hidden on mobile */}
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname.startsWith('/admin') ? '/admin' : location.pathname]}
        items={menuItems}
        style={{ flex: 1, justifyContent: 'flex-end', minWidth: 0, border: 'none', background: 'transparent' }}
        className="desktop-menu"
      />
      {/* Mobile menu button - visible only on small screens */}
      <Button
        type="text"
        icon={<MenuOutlined />}
        onClick={() => setDrawerOpen(true)}
        style={{ color: '#fff', fontSize: 20, display: 'none' }}
        className="mobile-menu-btn"
      />
      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        styles={{ body: { padding: 0 } }}
      >
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname.startsWith('/admin') ? '/admin' : location.pathname]}
          items={menuItems}
          style={{ border: 'none', height: '100%' }}
          onClick={() => setDrawerOpen(false)}
        />
      </Drawer>
      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-menu-btn { display: inline-flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </Header>
  );
}

export default Navbar;
