"use client";
import React from "react";

import FileUploader from "./FileUploader";

const Banner = () => {
 
  return (
    <div className='flex items-center justify-center h-screen mb-12 bg-fixed bg-center bg-cover custom-img'>
      {/* Overlay */}
      <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/80 z-[2]' />
      <div className='p-5 text-white z-[2] mt-[-10rem]'>
      
     
    <div className="box-border max-w-3xl h-30 w-full md:w-96 lg:w-160 p-4 rounded bg-blue-600  relative shadow md:shadow-md shadow-blue mt-60">
          <h1 className="text-xl text-white text-center md:text-xl uppercase font-light">
             COMPRESS YOUR FILES HERE
          </h1>
          <FileUploader/>
        </div>
        </div>
      </div> 


    
    
  );
};

export default Banner;