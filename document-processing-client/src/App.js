import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('pdf', selectFile);

      await axios.post('http://localhost:5000/upload', formData);

      // Handle success (showing success message)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <input type ="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload PDF</button>
    </div>
  );

  }

  export default App;