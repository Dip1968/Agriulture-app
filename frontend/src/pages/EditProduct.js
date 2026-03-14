// Edit Product - Ant Design Form, mobile responsive
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Card, Form, Input, InputNumber, Button, Alert, Spin, Image } from 'antd';
import api from '../api/axios';

function EditProduct() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        // Postgres numeric may come as string — convert to number for InputNumber
        const priceVal = typeof data.price === 'number' ? data.price : parseFloat(String(data.price || '').replace(/,/g, ''));
        // set fields after a tick so the form instance is bound to the Form element
        setTimeout(() => {
          form.setFieldsValue({ title: data.title, description: data.description || '', price: isNaN(priceVal) ? undefined : priceVal });
        }, 0);
        setImageUrl(data.image_url || '');
      } catch (err) {
        setError('Product not found.');
      } finally {
        setFetching(false);
      }
    };
    fetchProduct();
  }, [id, form]);

  const onFinish = async (values) => {
    setError('');
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description || '');
      // ensure price is sent as a clean number/string (remove any formatting)
      const priceVal = typeof values.price === 'number' ? values.price : String(values.price || '').replace(/,/g, '');
      formData.append('price', priceVal);
      formData.append('image_url', imageUrl);
      if (imageFile) formData.append('image', imageFile);
      await api.put(`/products/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div style={{ textAlign: 'center', padding: 48 }}><Spin size="large" /></div>;
  if (error && !form.getFieldValue('title')) return <Alert message={error} type="error" showIcon style={{ margin: 16 }} />;

  return (
    <div style={{ padding: '16px 0', maxWidth: 500 }}>
      <h1 style={{ marginBottom: 16 }}>Edit Product</h1>
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
          <Form.Item label="Current Image">
            {imageUrl ? <Image src={imageUrl} width={120} style={{ borderRadius: 8 }} alt="Current" /> : <span>No image</span>}
          </Form.Item>
          <Form.Item label="New Image (optional)">
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0])} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>Update Product</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default EditProduct;
