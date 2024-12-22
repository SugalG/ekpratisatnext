// components/UploadImage.js
'use client';

import { useState } from 'react';
import { Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadImage = ({ onImageUpload }) => {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Send the file to the API route for upload
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.url) {
        onImageUpload(data.url); // Callback to pass the image URL
        message.success('Image uploaded successfully');
      } else {
        message.error('Failed to upload image');
      }
    } catch (error) {
      console.error(error);
      message.error('Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Upload
      beforeUpload={(file) => handleUpload(file)}
      showUploadList={false}
    >
      <Button
        type="primary"
        icon={<UploadOutlined />}
        loading={loading}
      >
        Upload Image
      </Button>
    </Upload>
  );
};

export default UploadImage;
