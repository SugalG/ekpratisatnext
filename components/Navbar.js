'use client';

import { Layout, Menu, Button, Avatar, Dropdown, Spin } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import { useSession, signOut } from 'next-auth/react';

const { Header } = Layout;

const Navbar = () => {
  const { data: session, status } = useSession(); // Destructure session and status

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' }); // Redirect to homepage after logout
  };

  // If session is loading, display a loading spinner
  if (status === 'loading') {
    return (
      <Header
        style={{
          padding: 0,
          borderBottom: '2px solid #444',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Spin size="large" style={{ marginLeft: '16px' }} />
      </Header>
    );
  }

  const menuItems = [
    {
      key: 'createListing',
      label: <Link href="/create-listing">Create Property Listing</Link>,
      icon: <PlusOutlined />,
    },
    {
      key: 'logout',
      label: <span onClick={handleLogout}>Logout</span>,
      icon: <UserOutlined />,
    },
  ];

  return (
    <Header
      style={{
        position: 'relative',
        padding: 0,
        borderBottom: '2px solid #444',
        height: '100px', // Adjust navbar height
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1000,
        overflow: 'hidden', // Ensure no overflow issues with video
      }}
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1, // Ensure the video stays behind content
        }}
      >
        <source src="/videos/BG for Navbar.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Left Menu (Buy and Rent) */}
      <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '16px' }}>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['buy']}
          style={{
            border: 'none',
            background: 'transparent',
          }}
          items={[
            {
              key: 'buy',
              label: <Link href="/buy" style={{ color: '#fff' }}>Buy</Link>,
            },
            {
              key: 'rent',
              label: <Link href="/rent" style={{ color: '#fff' }}>Rent</Link>,
            },
          ]}
        />
      </div>

      {/* Center Logo */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%', // Ensure it centers vertically
          paddingTop: '30px', // Adjust if needed
        }}
      >
        <Link href="/">
          <Image
            src="/images/Final Logo.svg"
            alt="My Real Estate Logo"
            width={200}  // Adjust the width for logo scaling
            height={200}  // Ensure the logo fits within navbar height
            style={{
              objectFit: 'contain',
              maxHeight: '100%',
              background: 'inherit',
            }}
          />
        </Link>
      </div>

      {/* Right User Menu */}
      <div style={{ display: 'flex', alignItems: 'center', paddingRight: '16px' }}>
        {session ? (
          <Dropdown
            menu={{ items: menuItems }}
            placement="bottomRight"
            arrow
          >
            <Avatar
              style={{
                backgroundColor: '#87d068',
                cursor: 'pointer',
              }}
              icon={<UserOutlined />}
              size="large"
            />
          </Dropdown>
        ) : (
          <>
            <Button type="primary" style={{ marginRight: '10px' }}>
              <Link href="/auth/signin" style={{ color: '#fff' }}>Sign In</Link>
            </Button>
            <Button type="default">
              <Link href="/auth/signup" style={{ color: '#333' }}>Sign Up</Link>
            </Button>
          </>
        )}
      </div>
    </Header>
  );
};

export default Navbar;
