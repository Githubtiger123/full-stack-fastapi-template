import React from 'react';
import { Layout, theme } from 'antd';
import AppSider from '@/components/Common/AppSider';
import AppHeader from '@/components/Common/AppHeader';
import Home from './_layout/index/index'

const { Content } = Layout;

const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: '100vh' }}>
      <AppSider />
      <Layout>
        <AppHeader />
        <Content
          style={{
            margin: '14px 14px',
            padding: 6,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'auto',
          }}
        >
          <Home/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
