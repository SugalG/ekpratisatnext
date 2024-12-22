'use client';

import { CldImage } from 'next-cloudinary';

const CloudinaryImage = ({ publicId, altText }) => {
  return (
    <CldImage
      src={publicId} // Cloudinary public ID or URL
      alt={altText}
      width={500}
      height={500}
      crop="fill"
      quality="auto"
    />
  );
};

export default CloudinaryImage;
