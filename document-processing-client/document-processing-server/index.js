const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const pdfparse = require('pdf-parse');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://hjasaiwal114:12345@cluster0.qsgu4r2.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connection established successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const documentSchema = new mongoose.Schema({
  inceptionDate: String,
  policyHolderName: String,
  policyHolderAge: Number,
  sumInsured: Number,
  policyNumber: String,
});

const Document = mongoose.model('Document', documentSchema);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.post('/upload', upload.single('pdf'), async (req, res) => {
    try {
      const buffer = req.file.buffer;
      const data = await pdfparse(buffer);
  
      // Log the extracted text for debugging
      console.log('Extracted Text:', data.text);
  
      const extractedInfo = {
        inceptionDate: extractInceptionDate(data.text),
        policyHolderName: extractPolicyHolderName(data.text),
        policyHolderAge: extractPolicyHolderAge(data.text),
        sumInsured: extractSumInsured(data.text),
        policyNumber: extractPolicyNumber(data.text),
      };
  
      console.log('Extracted Info:', extractedInfo);
  
      const document = new Document(extractedInfo);
      await document.save();
  
      res.json({ success: true, message: 'PDF uploaded and parsed successfully' });
    } catch (error) {
      console.error('Error parsing PDF:', error);
      res.status(500).json({ success: false, message: 'Error parsing PDF' });
    }
  });
  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Function to extract information
function extractInceptionDate(text) {
    const inceptionDateRegex = /Inception Date: (\d{4}-\d{2}-\d{2})/;
    const match = text.match(inceptionDateRegex);
    return match ? match[1] : null;
  }
  
  function extractPolicyHolderName(text) {
    const policyHolderNameRegex = /Policy Holder Name: (.+?)\n/;
    const match = text.match(policyHolderNameRegex);
    return match ? match[1] : null;
  }
  
  function extractPolicyHolderAge(text) {
    const policyHolderAgeRegex = /Policy Holder Age: (\d+)/;
    const match = text.match(policyHolderAgeRegex);
    return match ? parseInt(match[1]) : null;
  }
  
  function extractSumInsured(text) {
    const sumInsuredRegex = /Sum Insured: \$([0-9,]+)/;
    const match = text.match(sumInsuredRegex);
    return match ? parseFloat(match[1].replace(/,/g, '')) : null;
  }
  
  function extractPolicyNumber(text) {
    const policyNumberRegex = /Policy Number: (\w+)/;
    const match = text.match(policyNumberRegex);
    return match ? match[1] : null;
  }