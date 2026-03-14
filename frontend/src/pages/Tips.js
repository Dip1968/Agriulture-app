// Tips page - Ant Design Grid, mobile responsive
import React from 'react';
import { Row, Col, Card, Typography, Modal, Button } from 'antd';
import api from '../api/axios';

const { Title, Paragraph } = Typography;
const { Meta } = Card;

const tips = [
  {
    title: 'Soil Preparation',
    desc: 'Prepare soil before sowing by ploughing and adding organic manure.',
    key: 'tip_soil'
  },
  {
    title: 'Seed Selection',
    desc: 'Choose certified seeds suited to your climate and soil type.',
    key: 'tip_seed'
  },
  {
    title: 'Water Management',
    desc: 'Water crops at the right time - early morning or late evening.',
    key: 'tip_water'
  },
  {
    title: 'Pest Control',
    desc: 'Use integrated pest management and natural remedies when possible.',
    key: 'tip_pest'
  },
  {
    title: 'Crop Rotation',
    desc: 'Rotate crops to maintain soil fertility and reduce pests.',
    key: 'tip_rotation'
  },
  {
    title: 'Harvest Timing',
    desc: 'Harvest at the right maturity for best quality and yield.',
    key: 'tip_harvest'
  }
];

function Tips() {
  const [settings, setSettings] = React.useState({});
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalTip, setModalTip] = React.useState(null);

  React.useEffect(() => {
    api.get('/settings').then(({ data }) => setSettings(data)).catch(() => {});
  }, []);

  return (
    <div style={{ padding: '24px 0', maxWidth: 1200, margin: '0 auto' }}>
      <Title level={2} style={{ textAlign: 'center' }}>Agriculture Tips</Title>
      <Paragraph style={{ marginBottom: 24, textAlign: 'center' }}>Useful farming tips for better results</Paragraph>
      <Row gutter={[16, 16]}>
        {tips.map((tip, i) => {
          // use admin-provided url if available otherwise fallback SVG
          let imgUrl = undefined;
          if (tip.key && settings[tip.key]) {
            imgUrl = settings[tip.key];
          } else {
            const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
              <rect width="400" height="200" fill="#d9f7be"/>
              <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="24" fill="#1b3a16">${tip.title}</text>
            </svg>`;
            imgUrl = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
          }
          return (
            <Col xs={24} sm={12} md={8} key={i}>
              <Card
                hoverable
                onClick={() => { setModalTip({ ...tip, img: imgUrl }); setModalOpen(true); }}
                style={{ cursor: 'pointer' }}
                cover={<img alt={tip.title} src={imgUrl} style={{ width: '100%', height: 200, objectFit: 'cover' }} />}
              >
                <Meta title={tip.title} description={tip.desc} />
              </Card>
            </Col>
          );
        })}
      </Row>
      <Modal open={modalOpen} title={modalTip?.title} onCancel={() => setModalOpen(false)} footer={<Button onClick={() => setModalOpen(false)}>Close</Button>}>
        {modalTip && (
          <div style={{ textAlign: 'center' }}>
            <img src={modalTip.img} alt={modalTip.title} style={{ width: '100%', maxHeight: 360, objectFit: 'cover', borderRadius: 8 }} />
            <p style={{ marginTop: 12 }}>{modalTip.desc}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Tips;
