import React, { useState } from 'react';
import axios from 'axios';

const uploadForm = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('pdf', file);

        try {
            await axios.post('http://localhost:5000/upload', formData);
            console.log('PDF uploaded and parsed successfully');
        } catch (error) {
            console.error('Error uploading and parsing PDF');
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleSubmit}>Upload and parse PDF</button>
        </div>
    );
};

export default uploadForm;