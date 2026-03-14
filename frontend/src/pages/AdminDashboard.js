// Admin Dashboard - Ant Design Table, mobile responsive
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Spin, Alert, Image, Space, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '../api/axios';

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (err) {
      setError('Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Delete Product',
      content: 'Are you sure you want to delete this product?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await api.delete(`/products/${id}`);
          fetchProducts();
        } catch (err) {
          Modal.error({ title: err.response?.data?.message || 'Delete failed.' });
        }
      }
    });
  };

  const columns = [
    { title: 'Image', dataIndex: 'image_url', key: 'img', responsive: ['md'], render: (url, row) => url ? <Image src={url} width={50} height={50} style={{ objectFit: 'cover' }} alt={row.title} /> : '—' },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Price', dataIndex: 'price', key: 'price', render: (p) => `₹${p}` },
      {
      title: 'Actions', key: 'actions', render: (_, row) => (
        <Space wrap>
          <Link to={`/admin/edit-product/${row.id}`}><Button type="primary" size="small" icon={<EditOutlined />} >Edit</Button></Link>
          <Button type="primary" danger size="small" icon={<DeleteOutlined />} onClick={() => handleDelete(row.id)}>Delete</Button>
        </Space>
      )
    }
  ];

  if (loading) return <div style={{ textAlign: 'center', padding: 48 }}><Spin size="large" /></div>;
  if (error) return <Alert message={error} type="error" showIcon style={{ margin: 16 }} />;

  return (
    <div style={{ padding: '16px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>Admin Dashboard</h1>
        <div>
          <Link to="/admin/settings"><Button style={{ marginRight: 8 }}>Site Settings</Button></Link>
          <Link to="/admin/add-product"><Button type="primary">Add Product</Button></Link>
        </div>
      </div>
      {products.length === 0 ? (
        <Alert message="No products. Add your first product!" type="info" showIcon />
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <Table dataSource={products} columns={columns} rowKey="id" pagination={{ pageSize: 10 }} />
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
