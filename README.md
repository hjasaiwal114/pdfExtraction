# PDF Extraction Web App

This web application allows users to upload PDF files for parsing and extracting relevant information. The parsed data is stored in a MongoDB database.

## Features

- **Easy Upload:** Simple drag-and-drop functionality for quick file uploading.
- **Efficient Parsing:** Automatically extracts data from the uploaded PDFs.
- **MongoDB Integration:** Stores parsed data in a MongoDB database.
- **Responsive UI:** A user-friendly interface that works seamlessly across devices.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/hjasaiwal114/pdfExtraction.git
Install dependencies:

bash
Copy code
cd pdfExtraction
npm install
Set up MongoDB:

Create a MongoDB database.
Update the MongoDB connection string in server.js with your database details.
Start the application:

bash
Copy code
npm start
Open your browser and go to http://localhost:5000

Usage
Choose a PDF file using the file input.
Click the "Upload PDF" button.
The app will parse the PDF, extract relevant information, and store it in the MongoDB database.
View the success or error message on the UI.
Technologies Used
Frontend: React, Axios, Tailwind CSS
Backend: Node.js, Express, MongoDB
PDF Parsing: pdf-parse
Styling: Tailwind CSS
License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
pdf-parse for PDF parsing capabilities.
Tailwind CSS for styling the UI.