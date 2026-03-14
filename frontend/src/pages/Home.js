// Home page - Ant Design, mobile responsive
import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Typography, Modal } from 'antd';
import api from '../api/axios';

const { Title, Paragraph } = Typography;

function Home() {
  // images may be set by admin via settings
  const [heroImg, setHeroImg] = React.useState('https://source.unsplash.com/1200x400/?farmers,agriculture');
  const [seedImg, setSeedImg] = React.useState('https://source.unsplash.com/400x300/?seeds');
  const [fertImg, setFertImg] = React.useState('https://source.unsplash.com/400x300/?fertilizer');
  const [deliveryImg, setDeliveryImg] = React.useState('https://source.unsplash.com/400x300/?delivery');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  React.useEffect(() => {
    api.get('/settings').then(({ data }) => {
      if (data.home_hero) setHeroImg(data.home_hero);
      if (data.home_card_seed) setSeedImg(data.home_card_seed);
      if (data.home_card_fert) setFertImg(data.home_card_fert);
      if (data.home_card_delivery) setDeliveryImg(data.home_card_delivery);
    }).catch(() => {});
  }, []);

  return (
    <div style={{ padding: '12px 0', maxWidth: 1200, margin: '0 auto' }}>
      <Row gutter={[12, 12]}>
        <Col xs={24}>
          <Card
            hoverable
            cover={<img src={heroImg} alt="Hero" style={{ width: '100%', height: 200, objectFit: 'cover' }} />}
            style={{ border: 'none' }}
            styles={{ body: { padding: '12px 16px' } }}
          >
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <Title level={2} style={{ color: '#1b3a16', margin: '4px 0' }}>Welcome to Jivdaya Agro Mart</Title>
              <Paragraph style={{ fontSize: 16, color: '#2d5a27', margin: '4px 0' }}>Your trusted partner for quality agricultural products</Paragraph>
              <Link to="/products"><Button type="primary" size="large">Browse Products</Button></Link>
            </div>
          </Card>
        </Col>
        <Col xs={24}>
          <Card title="Why Jivdaya?" style={{ textAlign: 'center' }} styles={{ body: { padding: '12px 16px' } }}>
            <Paragraph style={{ margin: '0' }}>
              Jivdaya Agro Mart is committed to bringing farmers and buyers together with high-quality seeds, fertilizers, and agricultural supplies. We believe in sustainable farming and support local agriculture.
            </Paragraph>
            <Link to="/about"><Button>Learn More</Button></Link>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card hoverable onClick={() => { setModalData({ title: 'Quality Seeds', img: seedImg, desc: 'Premium seeds for better yield' }); setModalOpen(true); }} style={{ cursor: 'pointer' }} styles={{ body: { padding: '12px' } }} cover={<img src={seedImg} alt="Seeds" style={{ width: '100%', height: 200, objectFit: 'cover' }} />}> 
            <Title level={4} style={{ color: '#2d5a27', textAlign: 'center', margin: '4px 0' }}>Quality Seeds</Title>
            <Paragraph style={{ textAlign: 'center', margin: '0' }}>Premium seeds for better yield</Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable onClick={() => { setModalData({ title: 'Fertilizers', img: fertImg, desc: 'Organic and chemical fertilizers' }); setModalOpen(true); }} style={{ cursor: 'pointer' }} styles={{ body: { padding: '12px' } }} cover={<img src={fertImg} alt="Fertilizers" style={{ width: '100%', height: 200, objectFit: 'cover' }} />}> 
            <Title level={4} style={{ color: '#2d5a27', textAlign: 'center', margin: '4px 0' }}>Fertilizers</Title>
            <Paragraph style={{ textAlign: 'center', margin: '0' }}>Organic and chemical fertilizers</Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable onClick={() => { setModalData({ title: 'Quick Delivery', img: deliveryImg, desc: 'Order via WhatsApp for fast delivery' }); setModalOpen(true); }} style={{ cursor: 'pointer' }} styles={{ body: { padding: '12px' } }} cover={<img src={deliveryImg} alt="Delivery" style={{ width: '100%', height: 200, objectFit: 'cover' }} />}> 
            <Title level={4} style={{ color: '#2d5a27', textAlign: 'center', margin: '4px 0' }}>Quick Delivery</Title>
            <Paragraph style={{ textAlign: 'center', margin: '0' }}>Order via WhatsApp for fast delivery</Paragraph>
          </Card>
        </Col>
      </Row>
      <Modal open={modalOpen} title={modalData?.title} onCancel={() => setModalOpen(false)} footer={<Button onClick={() => setModalOpen(false)}>Close</Button>}>
        {modalData && (
          <div style={{ textAlign: 'center' }}>
            <img src={modalData.img} alt={modalData.title} style={{ width: '100%', maxHeight: 360, objectFit: 'cover', borderRadius: 8 }} />
            <Paragraph style={{ marginTop: 12 }}>{modalData.desc}</Paragraph>
            <Link to="/products"><Button type="primary">Browse Products</Button></Link>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Home;
