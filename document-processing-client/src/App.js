import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    // Use event.currentTarget.files to get the selected file(s)
    setSelectedFile(event.currentTarget.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      if (!selectedFile) {
        // Handle the case where no file is selected
        console.error('Please select a file before uploading.');
        return;
      }

      const formData = new FormData();
      formData.append('pdf', selectedFile);

      // Use relative path instead of absolute URL
      const response = await axios.post('http://localhost:5000/upload', formData);

      // Log the response from the server
      console.log(response.data);
    } catch (error) {
      // Handle errors (showing error message, logging, etc.)
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
