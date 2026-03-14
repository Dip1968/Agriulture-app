// Add Product - Ant Design Form, mobile responsive
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Form, Input, InputNumber, Button, Alert, Space } from 'antd';
import api from '../api/axios';

function AddProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setError('');
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description || '');
      formData.append('price', values.price);
      if (imageFile) formData.append('image', imageFile);
      await api.post('/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '16px 0', maxWidth: 500 }}>
      <h1 style={{ marginBottom: 16 }}>Add Product</h1>
      <Link to="/admin"><Button type="link" style={{ paddingLeft: 0, marginBottom: 16 }}>← Back to Dashboard</Button></Link>
      <Card>
        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}
        <Form form={form} layout="vertical" onFinish={onFinish} size="large">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input placeholder="Product title" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} placeholder="Product description" />
          </Form.Item>
          <Form.Item name="price" label="Price (₹)" rules={[{ required: true, type: 'number', min: 0 }]}>
            <InputNumber style={{ width: '100%' }} placeholder="0.00" min={0} step={0.01} />
          </Form.Item>
          <Form.Item label="Image">
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0])} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>Add Product</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default AddProduct;
