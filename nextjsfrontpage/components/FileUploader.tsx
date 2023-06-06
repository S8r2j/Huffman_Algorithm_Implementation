"use client";
import { useState } from 'react';
import { AiOutlineCloudUpload, AiOutlineDelete } from 'react-icons/ai';
import { useTypewriter, Cursor } from "react-simple-typewriter";

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
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [draggedOver, setDraggedOver] = useState(false);
  const [draggedPosition, setDraggedPosition] = useState({});


  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleDelete = (index) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
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

  const handleUpload = () => {
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
            console.log('Uploaded Files:', selectedFiles);
            
          }
        }
      }, 500);
    });
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
            Upload
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
    </div>
    
  );
};

export default FileUploader;
