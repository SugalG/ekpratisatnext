'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Input, Button, Form, Typography, Alert } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Use router for redirecting

  const handleSubmit = async (values) => {
    setLoading(true);
    setError(''); // Clear previous error on submit

    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false, // prevent automatic redirect
      callbackUrl: '/', // Redirect to homepage after successful login
    });

    if (result?.error) {
      setError('Invalid email or password.');
    } else if (result?.ok) {
      router.push('/'); // Redirect to homepage after successful login
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem' }}>
      <Typography.Title level={2} style={{ textAlign: 'center' }}>
        Sign In
      </Typography.Title>

      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: '1rem' }}
        />
      )}

      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Sign In
          </Button>
        </Form.Item>
      </Form>

      <hr />

      <Button
        type="default"
        icon={<GoogleOutlined />}
        onClick={() => signIn('google', { callbackUrl: '/' })}
        block
        style={{ marginTop: '1rem' }}
      >
        Sign In with Google
      </Button>

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Link href="/auth/signup">Don't have an account? Sign Up</Link>
      </div>
    </div>
  );
}
