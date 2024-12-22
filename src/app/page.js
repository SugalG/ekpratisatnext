'use client';

import { useState } from 'react';
import UploadImage from '../../components/UploadImage'; // Move one more level up to reach /components
import CloudinaryImage from '../../components/CloudinaryImage';
import Navbar from '../../components/Navbar';
import ExploreRealEstate from '../components/ExploreRealEstate'; // Import ExploreRealEstate
const HomePage = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageUpload = (url) => {
    setImageUrl(url);
  };

  return (
    <div style={{ padding: '2rem' }}>
      
     
      <ExploreRealEstate />
      
    </div>
  );
};

export default HomePage;
