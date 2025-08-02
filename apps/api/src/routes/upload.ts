import { Router } from 'express';
import multer from 'multer';
import cloudinary from '../lib/cloudinary';
import { db } from '../lib/firebaseAdmin';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() }); 

router.post('/upload', upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No video uploaded' });
    }

    const { buffer, mimetype } = req.file;
    const { title, description, url } = req.body;

    if (!title || !description || !url) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Bufferből készítünk feltöltést Cloudinary-nak
    const uploadResult = await cloudinary.uploader.upload_stream(
      {
        resource_type: 'video',
        folder: 'bachata-videos',
        format: mimetype.split('/')[1], // pl mp4
      },
      
      async (error, result) => {
        if (!result) {
          return res.status(500).json({ error: 'Upload failed' });
        }
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ error: 'Cloudinary feltöltési hiba' });
        }

        // Mentés Firestore-ba
        const videoData = {
          url: result.secure_url,
          public_id: result.public_id,
          createdAt: new Date(),
          title,
        };

        const docRef = await db.collection('videos').add(videoData);

        res.json({ id: docRef.id, ...videoData });
      }
    );

    // Buffert stream-be toljuk, hogy feltöltődjön
    uploadResult.end(buffer);
  } catch (error) {
    console.error('Upload hiba:', error);
    res.status(500).json({ error: 'Feltöltési hiba' });
  }
});

export default router;
