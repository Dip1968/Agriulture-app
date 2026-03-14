// Admin settings page - edit site images
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, message, Row, Col, Card, Typography, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import api from '../api/axios';

const { Title } = Typography;

// human friendly labels for each key
const LABELS = {
  home_hero: 'Home hero image',
  about_banner: 'About banner',
  tip_soil: 'Tip: Soil Preparation',
  tip_seed: 'Tip: Seed Selection',
  tip_water: 'Tip: Water Management',
  tip_pest: 'Tip: Pest Control',
  tip_rotation: 'Tip: Crop Rotation',
  tip_harvest: 'Tip: Harvest Timing',
  home_card_seed: 'Home card – Seeds',
  home_card_fert: 'Home card – Fertilizers',
  home_card_delivery: 'Home card – Delivery'
};

function AdminSettings() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data } = await api.get('/settings');
      setSettings(data);
    } catch (err) {
      message.error('Failed to load settings');
    }
  };

  const handleUrlChange = async (key, value) => {
    try {
      await api.put(`/settings/${key}`, { value });
      setSettings(prev => ({ ...prev, [key]: value }));
      message.success('Updated');
    } catch (err) {
      message.error('Update failed');
    }
  };

  const handleUpload = async (file, key) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const { data } = await api.post('/settings/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const url = data.url;
      await handleUrlChange(key, url);
    } catch (err) {
      message.error('Upload failed');
    }
    return false; // prevent default upload behaviour
  };

  return (
    <div style={{ padding: '24px 0', maxWidth: 800, margin: '0 auto' }}>
      <Title level={2}>Site Settings</Title>
      <Row gutter={16}>
        {Object.keys(LABELS).map(key => (
          <Col xs={24} md={12} key={key}>
            <Card style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <strong>{LABELS[key]}</strong>
                  <Input
                    value={settings[key] || ''}
                    onChange={e => handleUrlChange(key, e.target.value)}
                    placeholder="Image URL"
                    style={{ marginTop: 8 }}
                  />
                </div>
                <div style={{ width: 120 }}>
                  <Upload showUploadList={false} beforeUpload={file => handleUpload(file, key)}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </div>
              </div>
              <div style={{ marginTop: 12 }}>
                {settings[key] ? (
                  <img src={settings[key]} alt={key} style={{ width: '100%', maxHeight: 160, objectFit: 'cover', borderRadius: 6 }} />
                ) : (
                  <div style={{ height: 80, background: '#fafafa', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>No image set</div>
                )}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default AdminSettings;
