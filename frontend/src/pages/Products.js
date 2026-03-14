// Products page - Ant Design Grid, mobile responsive
import React, { useState, useEffect } from 'react';
import { Row, Col, Spin, Alert, Typography } from 'antd';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

const { Title } = Typography;

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
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
    fetchProducts();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: 48 }}><Spin size="large" /></div>;
  if (error) return <Alert message={error} type="error" showIcon style={{ margin: 16 }} />;

  return (
    <div style={{ padding: '16px 0' }}>
      <Title level={2} style={{ marginBottom: 24 }}>Our Products</Title>
      {products.length === 0 ? (
        <Alert message="No products available yet." type="info" showIcon />
      ) : (
        <Row gutter={[16, 16]}>
          {products.map((product) => (
            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Products;
