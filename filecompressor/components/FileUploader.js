"use client";
import { useState } from 'react';
import { AiOutlineCloudUpload, AiOutlineDelete } from 'react-icons/ai';
import { useTypewriter, Cursor } from "react-simple-typewriter";
import axios from 'axios';
import { saveAs } from 'file-saver';

const FileUploader = () => {
  const [text] = useTypewriter({
    words: [
      "Or drag files here.",
      "Or select multiple files.",
      
      
    ],
    loop: true,
    typeSpeed: 30,
    deleteSpeed: 10,
    delaySpeed: 2000,
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [formData, setFormData] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [draggedOver, setDraggedOver] = useState(false);
  const [draggedPosition, setDraggedPosition] = useState({});
  const [data, setData] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [decompress, setShowDecompress] = useState(null);
  const [compressionRatio, setCompressionRatio] = useState(null);
  const [showp, setShowp] = useState(false);

  const handleDecompress = async () => {
    const axios = require('axios');
    const FormData = require('form-data');
    let data = new FormData();
    data.append('upload_file', formData);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8000/decompress',
      headers: { 
        'Content-Type': 'multipart/form-data', 
        'Accept': 'application/json', 
      
      },
      data : data
     
    };

    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setData(response)
    })
    .catch((error) => {
      console.log(error);
    });
    setShowp(true);

  }
  // const handlecompressedDownload = () => {
  //   const downloadLink = document.createElement('a');
  //   const fileData = new Blob([data.data], { type: 'application/octet-stream'});
  //   const fileUrl = URL.createObjectURL(fileData);
  
  //   downloadLink.href = fileUrl;
  //   console.log(fileName)
  //   downloadLink.download = fileName;
  //   document.body.appendChild(downloadLink);
  //   downloadLink.click();
  //   document.body.removeChild(downloadLink);
  
  //   URL.revokeObjectURL(fileUrl);
  //   setShowDecompress(true);
  //   setCompressionRatio(null)
  //   setShowp(false);
  // };
  const handleDownload = () => {
    const encodedData = data.data; // Your encoded binary data
    const byteArray = new Uint8Array(encodedData.length);
  
    for (let i = 0; i < encodedData.length; i++) {
      byteArray[i] = encodedData.charCodeAt(i);
    }
  
    const blob = new Blob([byteArray], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
  
      setShowDecompress(true);
      setCompressionRatio(null)
      setShowp(false);
    };
 
  
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    setFormData(event.target.files[0]);
  };
  
  const handleDelete = (index) => {

    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
    setData(null)
    setShowDecompress(null)
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    const xPos = event.clientX;
    const yPos = event.clientY;
    setDraggedPosition({ xPos, yPos });
    setDraggedOver(true);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleUpload =async () => {
    setIsLoading(true);

    const totalFiles = selectedFiles.length;
    let uploadedCount = 0;

    selectedFiles.forEach((file, index) => {
      const uploadInterval = setInterval(() => {
        if (uploadedCount < index + 1) {
          const progress = Math.round(((uploadedCount + 1) / totalFiles) * 100);
          setUploadProgress((prevProgress) => ({
            ...prevProgress,
            [index]: progress,
          }));
          uploadedCount++;
        } else {
          clearInterval(uploadInterval);
          if (uploadedCount === totalFiles) {
            setIsLoading(false);
            setUploadProgress({});
            setUploadedFiles([...selectedFiles]);
            setSelectedFiles([]);   
            setFileName(selectedFiles[0].name)     
          }
        }
      }, 500);
    });
  
    const axios = require('axios');
    const FormData = require('form-data');
    let data = new FormData();
    data.append('upload_file', formData);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8000/compress',
      headers: { 
        'Content-Type': 'multipart/form-data', 
        'Accept': 'application/json', 
      
      },
      data : data
    };

    axios.request(config)
    .then((response) => {
      console.log((response.data));
      setData(response)
    })
    .catch((error) => {
      console.log(error);
    });
    
    try {
      // Make the GET request
      const response = await axios.get('http://localhost:8000/compression_ratio');
  
      // Handle the response
      console.log(response.data);
      setCompressionRatio(response.data) // Display the response data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    
  };

  const handleAddFile = () => {
    document.getElementById("file-input").click();
  };

  return (
    <div className="container mx-auto p-4">
       <div className={`border border-dashed bg-blue-500 rounded py-8 px-1 ${draggedOver ? 'dragged-over' : 'outline: 1px dashed #4169e1'}`}
       onDragOver={handleDragOver}
       onDrop={handleDrop}
       >
      <div className="mt-1 mb-2 flex justify-center">
        <input type="file" onChange={handleFileChange} multiple className="hidden" id="file-input"/>
        <label
            htmlFor="file-input"
            className="cursor-pointer bg-white text-black font-light py-2 px-6 rounded flex items-center relative"
          >
            <AiOutlineCloudUpload className="mr-2 text-blue-500" /> Select Files
          </label>
          <button
            onClick={handleAddFile}
            className="bg-green-500 text-white py-1 px-4 rounded ml-2"
          >
            +
          </button>
      

       
      </div>

      <p className="text-sm md:text-sm text-center text-white font-thin mt-2 mx-auto">
        {text} <Cursor cursorBlinking cursorStyle="|" cursorColor="#4169e1" />
      </p>
      </div>
      {!isLoading && selectedFiles.length > 0 && (
        <div className="bg-blue- mb-4">
          <h3 className="font-bold">Selected Files:</h3>
          <ul className="mt-2 space-y-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center">
                 <div className="w-56 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {file.name}
                </div>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 ml-2"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            ))}
          </ul>
          <button
            onClick={handleUpload}
            className="bg-green-500 text-white py-2 px-4 rounded mt-2"
          >
            Compress
          </button>
        </div>
      )}
      {isLoading && (
        <div>
          <p>Uploading...</p>
          {selectedFiles.map((file, index) => (
            <div key={index} className="mb-2">
              <p> <div className="w-56 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {file.name}
                </div></p>
              <div className="bg-gray-200 h-4">
                <div
                  className="bg-green-500 h-full"
                  style={{ width: `${uploadProgress[index] || 0}%` }}
                ></div>
              </div>
              <p className="mt-1">
                {uploadProgress[index] || 0}%
              </p>
            </div>
          ))}
        </div>
      )}
      {uploadedFiles.length > 0 && (
        <div>
          <h3 className="font-bold">Uploaded Files:</h3>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}> <div className="w-56 overflow-hidden overflow-ellipsis whitespace-nowrap">
              {file.name}
            </div>
            </li>
            ))}
          </ul>
        </div>
      )}

    
      {data &&  (<div>
      <button onClick={handleDownload}className='bg-green-500 px-5 py-2 rounded-md mt-2 ml-7 hover:bg-green-600'>Download File</button>
      {showp && (<p>file decompressed, Please download</p>)}
      </div>)}
      { decompress && (<div>
      <button onClick={handleDecompress}className='bg-blue-500 px-3 py-2 rounded-md mt-2 ml-7 hover:bg-blue-800'>Decompress File</button>
      </div>)}
      
      <div>
      {compressionRatio && (
        <div>
          <p>Size of file before compression: {compressionRatio['Size of file before compression']}</p>
          <p>Size of file after compression: {compressionRatio['Size of file after compression']}</p>
          <p>Compression Ratio: {compressionRatio['Compression Ratio(CR)']}</p>
        </div>
      ) }
    </div>
     
    </div>
    
  );
};

export default FileUploader;
