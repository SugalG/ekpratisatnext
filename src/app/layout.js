// src/app/layout.js
"use client"

import { SessionProvider, useSession } from 'next-auth/react';
import Navbar from '../../components/Navbar';
import { Layout, Spin } from 'antd';
import Providers from '../../lib/providers';

const { Content } = Layout;

const LoadingScreen = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5',
    }}
  >
    <Spin tip="Loading..." size="large" />
  </div>
);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Layout style={{ minHeight: '100vh' }}>
            <Navbar />
            <Content style={{ padding: '0 50px', marginTop: '64px' }}>
              {children}
            </Content>
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
