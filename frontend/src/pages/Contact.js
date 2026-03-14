// Contact page - Ant Design, mobile responsive
import React from 'react';
import { Card, Button, Typography, Row, Col } from 'antd';

const { Title, Paragraph } = Typography;

function Contact() {
  const handleWhatsApp = () => {
    const msg = encodeURIComponent('Hello, I have a query.');
    const num = (import.meta.env.VITE_WHATSAPP_NUMBER || '917990485206').replace(/\D/g, '');
    window.open(`https://wa.me/${num}?text=${msg}`, '_blank');
  };

  return (
    <div style={{ padding: '24px 0', maxWidth: 1000, margin: '0 auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>Contact Us</Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card>
            <Paragraph>Have questions? Reach out to us via WhatsApp for quick assistance.</Paragraph>
            <Paragraph><strong>Order Support:</strong> Use Buy Now on any product page</Paragraph>
            <Paragraph><strong>General Inquiries:</strong> Message us on WhatsApp</Paragraph>
            <Button type="primary" size="large" onClick={handleWhatsApp}>Chat on WhatsApp</Button>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <Paragraph><strong>Phone:</strong> {(import.meta.env.VITE_WHATSAPP_NUMBER || '917990485206')}</Paragraph>
            <Paragraph><strong>Email:</strong> support@jivdaya.example</Paragraph>
            <Paragraph><strong>Working Hours:</strong> Mon–Sat 9:00–18:00</Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Contact;
