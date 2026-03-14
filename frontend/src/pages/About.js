// About page - Ant Design, mobile responsive
import React from 'react';
import { Card, Typography, Row, Col, Image, Space } from 'antd';
import { CheckCircleOutlined, HeartOutlined, TeamOutlined, MobileOutlined } from '@ant-design/icons';
import api from '../api/axios';

const { Title, Paragraph } = Typography;

function About() {
  // image comes from settings (admin can change)
  const [aboutImg, setAboutImg] = React.useState('https://source.unsplash.com/1200x300/?farmers,field');

  React.useEffect(() => {
    api.get('/settings').then(({ data }) => {
      if (data.about_banner) setAboutImg(data.about_banner);
    }).catch(() => {});
  }, []);

  return (
    <div style={{ padding: '0' }}>
      {/* hero banner */}
      <div
        style={{
          position: 'relative',
          backgroundImage: `url(${aboutImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '100px 0',
          textAlign: 'center',
          color: '#fff'
        }}
      >
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.4)' }} />
        <Title level={2} style={{ color: '#fff', margin: 0, position: 'relative', zIndex: 1 }}>About Jivdaya Agro Mart</Title>
      </div>

      <div style={{ padding: '24px 0', maxWidth: 1000, margin: '0 auto' }}>
        <Row gutter={[24, 24]} align="top">
          <Col xs={24} md={12}>
            <Card variant="plain" style={{ background: '#f6ffed', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <Title level={4}>Who We Are</Title>
              <Paragraph>
                Jivdaya Agro Mart was founded with a mission to support farmers and bring quality agricultural products to everyone. We understand the importance of agriculture in our economy and daily lives.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card variant="plain" style={{ background: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <Title level={4}>Our Mission</Title>
              <Paragraph>
                To provide affordable, high-quality seeds, fertilizers, and farming supplies while building strong relationships with local farmers and buyers. We aim to make agricultural products easily accessible and empower communities through sustainable farming.
              </Paragraph>
            </Card>
          </Col>
        </Row>
        <Row gutter={[24, 24]} style={{ marginTop: 32 }}>
          <Col span={24}>
            <Title level={4} style={{ textAlign: 'center' }}>Our Values</Title>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Space align="start">
              <CheckCircleOutlined style={{ fontSize: 24, color: '#52c41a' }} />
              <span>Quality – We source only the best products</span>
            </Space>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Space align="start">
              <HeartOutlined style={{ fontSize: 24, color: '#eb2f96' }} />
              <span>Trust – Honest dealings with every customer</span>
            </Space>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Space align="start">
              <TeamOutlined style={{ fontSize: 24, color: '#1890ff' }} />
              <span>Support – Helping farmers grow and succeed</span>
            </Space>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Space align="start">
              <MobileOutlined style={{ fontSize: 24, color: '#fa8c16' }} />
              <span>Accessibility – Easy ordering via WhatsApp</span>
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default About;
