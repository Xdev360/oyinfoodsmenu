/*
  Upload endpoint for serverless: accepts JSON { data: DATA_URI_OR_BASE64, filename }
  Uploads to Cloudinary (requires CLOUDINARY_URL env var) and returns { url }
*/
const cloudinary = require('cloudinary').v2;

if (process.env.CLOUDINARY_URL) cloudinary.config({ cloudinary_url: process.env.CLOUDINARY_URL });

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const { data, filename } = req.body || {};
  if (!data) return res.status(400).json({ message: 'Missing image data' });
  try{
    // data can be a data URI or base64 string
    const uploadResult = await cloudinary.uploader.upload(data, { folder: 'oyin-foods' });
    return res.json({ url: uploadResult.secure_url });
  }catch(err){
    console.error('Upload failed', err && err.message);
    return res.status(500).json({ message: 'Upload failed' });
  }
};
