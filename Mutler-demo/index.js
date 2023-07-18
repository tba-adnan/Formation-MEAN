const express = require('express');
const multer = require('multer');
const path = require('path'); // Read about dik sa3a. https://www.w3schools.com/nodejs/ref_path.asp

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); 
  }
});

const upload = multer({ storage });
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Error : file not uploaded.' });
  }
  console.log('Uploaded file:', req.file);
  res.json({ message: 'Success : File uploaded.' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
  console.log("Multer demo.")
  console.log('Running on port 3000');
});
