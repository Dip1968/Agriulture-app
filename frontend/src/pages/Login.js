// Login page - Ant Design Form, mobile responsive
import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Card, Form, Input, Button, Alert } from 'antd';
import api from '../api/axios';

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (localStorage.getItem('token') && user.role) {
    return <Navigate to={user.role === 'ADMIN' ? '/admin' : '/'} replace />;
  }

  const onFinish = async (values) => {
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', values);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate(data.user.role === 'ADMIN' ? '/admin' : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', padding: 16 }}>
      <Card title="Login" style={{ width: '100%', maxWidth: 400 }}>
        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}
        <Form name="login" onFinish={onFinish} layout="vertical" size="large">
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>Login</Button>
          </Form.Item>
          <div style={{ textAlign: 'center' }}>
            Don't have an account? <a href="/register">Register</a>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
