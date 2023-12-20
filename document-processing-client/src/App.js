import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.currentTarget.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      if (!selectedFile) {
        console.error('Please select a file before uploading.');
        return;
      }

      const formData = new FormData();
      formData.append('pdf', selectedFile);

      await axios.post('http://localhost:5000/upload', formData);

      console.log('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="App">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload PDF</button>
    </div>
  );
}

export default App;
