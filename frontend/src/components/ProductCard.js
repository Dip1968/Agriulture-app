// Product card with Ant Design - mobile responsive
import React, { useState } from 'react';
import { Card, Button, Modal, Input, Space } from 'antd';
import { generateWhatsAppLink } from '../utils/whatsapp';

function ProductCard({ product }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [location, setLocation] = useState('');

  const handleConfirmBuy = () => {
    if (!location.trim()) return;
    const link = generateWhatsAppLink(product.title, product.price, location.trim());
    window.open(link, '_blank');
    setModalOpen(false);
    setLocation('');
  };

  return (
    <>
      <Card
        hoverable
        cover={
          product.image_url ? (
            <img alt={product.title} src={product.image_url} style={{ height: 180, objectFit: 'cover' }} />
          ) : (
            <div style={{ height: 180, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>No Image</div>
          )
        }
        actions={[
          <Button type="primary" block key="buy" onClick={() => setModalOpen(true)}>Buy Now</Button>
        ]}
      >
        <Card.Meta
          title={product.title}
          description={
            <>
              <div style={{ fontWeight: 'bold', color: '#2d5a27', marginBottom: 8 }}>₹{product.price}</div>
              <div style={{ fontSize: 13, color: '#666' }}>{product.description || 'Quality agro product'}</div>
            </>
          }
        />
      </Card>
      <Modal
        title="Enter Delivery Location"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={
          <Space>
            <Button onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="primary" onClick={handleConfirmBuy} disabled={!location.trim()}>
              {location.trim() ? 'Continue' : 'Open WhatsApp'}
            </Button>
          </Space>
        }
      >
        <p>Please enter your delivery location (required):</p>
        <Input
          placeholder="Enter your location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          size="large"
        />
      </Modal>
    </>
  );
}

export default ProductCard;
