const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const pdfparse = require('pdf-parse');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://hjasaiwal114:12345@cluster0.qsgu4r2.mongodb.net/', { useNewUrlParser: true, useUnifiedtopology: true });

// Set up multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Express routes for PDF upload and praising
app.post('upload', upload.single('pdf'), async(req, res) => {
    try {
        const buffer = req.file.buffer;
        const data = await pdfparse(buffer);

        // Extract relevant infromation (Inception Date, Policy Holder Name, etc) from 'data' object

        const extractedInfo = {
            inceptionDate: extractInceptionDate(data.text),
            policyHolderName: extractPolicyHolderName(data.text),
            policyHolderrAge: extractPolicyHolderAge(data.text),
            sumInsured: extractSumInsured(data.text),
            policyNumber: extractPolicyNumber(data.text),
        };

        // Store the extracted information in mongoDB
        const document  = new Document(extractedInfo);
        await document.save();

      res.json({ success: true, message: 'PDF uploaded and parse successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error parsing PDF'});
    }
});

app.listen(PORT, () => {
    console.log('Server is running on port ${port}');
});

// function to extract information
function extractInceptionDate(text) {
    const inceptionDateRegex = /Inception Date: (\d{2}\/\d{2}\/\d{4})/;
    const match = text.match(inceptionDateRegex);
    return match? match[1] : null;
}

function extractPolicyHolderName(text) {
    const policyHolderNameRegex = /Policy Holder Name: (.+)/;
    const match = text.macth(policyHolderNameRegex);
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