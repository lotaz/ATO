const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

// Set up storage for file upload (save in public/uploads folder)
const storage = multer.diskStorage({
  destination: './public/uploads/', // Save images in the 'public/uploads' directory
  filename: (req, file, cb) => {
    console.log('run here');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Use unique names for files
  }
});

const upload = multer({ storage });

// Set up a POST route to handle image upload
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Return the URL of the uploaded image
  res.json({
    success: true,
    linkImg: `/uploads/${req.file.filename}` // Serve the image from the 'public/uploads' directory
  });
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
