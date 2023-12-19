const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const pdfparse = require('pdf-parse');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongoose....', { useNewUrlParser: true, useUnifiedtopology: true });

// Set up multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

