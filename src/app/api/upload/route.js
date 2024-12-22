// app/api/upload/route.js
import cloudinary from '../../../../lib/cloudinary';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    // Upload the image to Cloudinary
    const uploadedImage = await cloudinary.uploader.upload(file, {
      folder: 'real-estate-app', // Optional: specify a folder in Cloudinary
    });

    // Return the uploaded image URL
    return new Response(JSON.stringify({ url: uploadedImage.secure_url }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to upload image' }), { status: 500 });
  }
}
