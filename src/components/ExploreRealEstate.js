'use client';

import { useEffect, useState } from 'react';
import { Spin, Typography, Card, message } from 'antd';
import { useRouter } from 'next/navigation';

const { Title } = Typography;

export default function ExploreRealEstate() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Updated mock subcategories data (for the "Rent" category)
  const rentSubcategories = [
    { id: '1', name: 'Hostel for Boys', image: 'https://media.istockphoto.com/id/1409298953/photo/real-estate-agents-shake-hands-after-the-signing-of-the-contract-agreement-is-complete.jpg?s=612x612&w=0&k=20&c=SFybbpGMB0wIoI0tJotFqptzAYK_mICVITNdQIXqnyc=' },
    { id: '2', name: 'Hostel for Girls', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT138fAVURNBV_vN2b4AWqZRZIfmlPuOrTFyg&s' },
    { id: '3', name: 'House', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT138fAVURNBV_vN2b4AWqZRZIfmlPuOrTFyg&s' },
    { id: '4', name: 'Apartment', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT138fAVURNBV_vN2b4AWqZRZIfmlPuOrTFyg&s' },
    { id: '5', name: 'Land', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT138fAVURNBV_vN2b4AWqZRZIfmlPuOrTFyg&s' },
    { id: '6', name: 'Business', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT138fAVURNBV_vN2b4AWqZRZIfmlPuOrTFyg&s' },
    { id: '7', name: 'Office Space', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT138fAVURNBV_vN2b4AWqZRZIfmlPuOrTFyg&s' },
    { id: '8', name: 'Flat', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT138fAVURNBV_vN2b4AWqZRZIfmlPuOrTFyg&s' },
  ];

  // Updated mock subcategories data (for the "For Sale" category)
  const saleSubcategories = [
    { id: '1', name: 'House', image: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Land', image: 'https://via.placeholder.com/150' },
    { id: '3', name: 'Apartment', image: 'https://via.placeholder.com/150' },
  ];

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
        message.error('Failed to load categories.');
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if (loading) {
    return <Spin tip="Loading Categories..." />;
  }

  const handleSubcategoryClick = (subcategory) => {
    // Redirect to the respective subcategory page
    router.push(`/properties/rent/${subcategory.id}`);
  };

  const handleSaleSubcategoryClick = (subcategory) => {
    // Redirect to the respective subcategory page for sale
    router.push(`/properties/sale/${subcategory.id}`);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Title level={2}>Explore Real Estate</Title>

      {/* Display "Rent" Text */}
      <Typography.Title level={3}>Rent</Typography.Title>

      {/* Display Subcategories for Rent in a horizontal line */}
      <div style={{ display: 'flex', justifyContent: 'space-between', overflowX: 'auto', marginBottom: '2rem' }}>
        {rentSubcategories.map((subcategory) => (
          <Card
            key={subcategory.id}
            hoverable
            style={{
              width: '150px', // Make the card width small
              margin: '0 8px', // Reduced space between cards
              borderRadius: '8px',
            }}
            cover={<img alt={subcategory.name} src={subcategory.image} style={{ height: '120px', objectFit: 'cover' }} />}
            onClick={() => handleSubcategoryClick(subcategory)}
          >
            <Card.Meta
              title={<span style={{ fontSize: '12px', fontWeight: 'bold', textAlign: 'center' }}>{subcategory.name}</span>}
            />
          </Card>
        ))}
      </div>

      {/* Display "For Sale" Text */}
      <Typography.Title level={3}>For Sale</Typography.Title>

      {/* Display Subcategories for Sale in a horizontal line */}
      <div style={{ display: 'flex', justifyContent: 'space-between', overflowX: 'auto' }}>
        {saleSubcategories.map((subcategory) => (
          <Card
            key={subcategory.id}
            hoverable
            style={{
              width: '150px', // Ensure the cards have the same width
              margin: '0 8px', // Reduced space between cards to make them closer
              borderRadius: '8px',
            }}
            cover={<img alt={subcategory.name} src={subcategory.image} style={{ height: '120px', objectFit: 'cover' }} />}
            onClick={() => handleSaleSubcategoryClick(subcategory)}
          >
            <Card.Meta
              title={<span style={{ fontSize: '12px', fontWeight: 'bold', textAlign: 'center' }}>{subcategory.name}</span>}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}
