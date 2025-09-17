'use client';

import { Button, Typography, Space, Row, Col, Card } from 'antd';
import { 
  RocketOutlined, 
  SafetyOutlined, 
  ThunderboltOutlined,
  CloudOutlined 
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export default function HomePage() {
  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <Title level={1} style={{ fontSize: '3rem', marginBottom: '16px' }}>
          欢迎来到 Murphy
        </Title>
        <Paragraph style={{ fontSize: '1.2rem', color: '#666', marginBottom: '32px' }}>
          基于 Next.js 15 + Spring Boot 的现代化全栈应用框架
        </Paragraph>
        <Space size="large">
          <Button type="primary" size="large" icon={<RocketOutlined />}>
            开始使用
          </Button>
          <Button size="large">查看文档</Button>
        </Space>
      </div>

      {/* Features Section */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            hoverable
            style={{ textAlign: 'center', height: '100%' }}
            bodyStyle={{ padding: '32px 24px' }}
          >
            <RocketOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
            <Title level={4}>高性能</Title>
            <Paragraph>
              基于 Next.js 15 和 Spring Boot 最新版本，提供卓越的性能体验
            </Paragraph>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card 
            hoverable
            style={{ textAlign: 'center', height: '100%' }}
            bodyStyle={{ padding: '32px 24px' }}
          >
            <SafetyOutlined style={{ fontSize: '48px', color: '#52c41a', marginBottom: '16px' }} />
            <Title level={4}>安全可靠</Title>
            <Paragraph>
              集成 Spring Security 和 JWT，提供企业级安全保障
            </Paragraph>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card 
            hoverable
            style={{ textAlign: 'center', height: '100%' }}
            bodyStyle={{ padding: '32px 24px' }}
          >
            <ThunderboltOutlined style={{ fontSize: '48px', color: '#faad14', marginBottom: '16px' }} />
            <Title level={4}>快速开发</Title>
            <Paragraph>
              完整的开发工具链，支持热重载、自动化测试和部署
            </Paragraph>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card 
            hoverable
            style={{ textAlign: 'center', height: '100%' }}
            bodyStyle={{ padding: '32px 24px' }}
          >
            <CloudOutlined style={{ fontSize: '48px', color: '#722ed1', marginBottom: '16px' }} />
            <Title level={4}>云原生</Title>
            <Paragraph>
              支持 Docker 容器化部署和 Kubernetes 编排
            </Paragraph>
          </Card>
        </Col>
      </Row>

      {/* Technology Stack */}
      <div style={{ marginTop: '64px', textAlign: 'center' }}>
        <Title level={2}>技术栈</Title>
        <Row gutter={[16, 16]} style={{ marginTop: '32px' }}>
          <Col span={12}>
            <Card title="前端技术" style={{ height: '100%' }}>
              <ul style={{ textAlign: 'left', paddingLeft: '20px' }}>
                <li>Next.js 15 + React 18</li>
                <li>TypeScript</li>
                <li>Ant Design</li>
                <li>Zustand (状态管理)</li>
                <li>Server-Sent Events</li>
                <li>Jest + Playwright (测试)</li>
              </ul>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="后端技术" style={{ height: '100%' }}>
              <ul style={{ textAlign: 'left', paddingLeft: '20px' }}>
                <li>Spring Boot 3.x</li>
                <li>Spring Security + JWT</li>
                <li>Spring Cloud</li>
                <li>PostgreSQL + MongoDB</li>
                <li>Redis + Kafka</li>
                <li>OpenAPI/Swagger</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}