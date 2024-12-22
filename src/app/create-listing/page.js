'use client';

import { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Select, Typography, message } from 'antd';
import UploadImage from '../../../components/UploadImage';

const { Title } = Typography;

export default function CreateListing() {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [categories, setCategories] = useState([]); // To hold categories
  const [subCategories, setSubCategories] = useState([]); // To hold subcategories
  const [selectedCategory, setSelectedCategory] = useState(''); // To track selected category

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data); // Set categories from response
        } else {
          message.error('Failed to load categories');
        }
      } catch (error) {
        console.error(error);
        message.error('Error fetching categories');
      }
    };

    fetchCategories();
  }, []);

  // Fetch subcategories based on selected category
  const fetchSubCategories = async (categoryId) => {
    try {
      const response = await fetch(`/api/subcategories/${categoryId}`);
      if (response.ok) {
        const data = await response.json();
        setSubCategories(data); // Set subcategories based on selected category
      } else {
        message.error('Failed to load subcategories');
      }
    } catch (error) {
      console.error(error);
      message.error('Error fetching subcategories');
    }
  };

  // Handle category change to load subcategories
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchSubCategories(categoryId); // Fetch subcategories when category changes
  };

  // Handle image upload from UploadImage component
  const handleImageUpload = (url) => {
    setUploadedImages((prevImages) => [...prevImages, url]);
  };

  const handleSubmit = async (values) => {
    if (uploadedImages.length === 0) {
      message.error('Please upload at least one image.');
      return;
    }

    const listingData = {
      ...values,
      images: uploadedImages,
    };

    try {
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listingData),
      });

      if (response.ok) {
        message.success('Property listing created successfully!');
        setUploadedImages([]); // Reset images
      } else {
        const errorData = await response.json();
        message.error(`Failed to create listing: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Error submitting listing:', error);
      message.error('An unexpected error occurred.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem', background: '#fff', borderRadius: '8px' }}>
      <Title level={3}>Create Property Listing</Title>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter the property title!' }]}>
          <Input placeholder="e.g., Spacious 2BHK Apartment" />
        </Form.Item>

        <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter a description!' }]}>
          <Input.TextArea rows={4} placeholder="Describe the property..." />
        </Form.Item>

        <Form.Item label="Price (in NPR)" name="price" rules={[{ required: true, message: 'Please enter the price!' }]}>
          <InputNumber style={{ width: '100%' }} min={0} placeholder="e.g., 2500000" />
        </Form.Item>

        <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select a category!' }]}>
          <Select placeholder="Select Category" onChange={handleCategoryChange}>
            {categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Sub-Category" name="subCategory" rules={[{ required: true, message: 'Please select a sub-category!' }]}>
          <Select placeholder="Select Sub-Category">
            {subCategories.map((subCategory) => (
              <Option key={subCategory.id} value={subCategory.id}>
                {subCategory.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Location" name="location" rules={[{ required: true, message: 'Please enter the location!' }]}>
          <Input placeholder="e.g., Kathmandu, Nepal" />
        </Form.Item>

        <Form.Item label="Images" name="images" valuePropName="fileList">
          <UploadImage onImageUpload={handleImageUpload} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit Listing
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
