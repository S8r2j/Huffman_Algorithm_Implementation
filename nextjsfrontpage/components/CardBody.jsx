import React from "react";

const CardBody = () => {
  return (
    <div className="container mx-auto p-6 m-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-10 py-6">
          <h1 className="text-xl text-center text-blue-500 font-medium">Why compress files?</h1>
          <p className="text-gray-600 text-justify center mt-2">
          As the number of different file types have increased
           over the years we have seen new file types appear
            that range in size to such an extent that there's a need for users to be able compress files.
            Compressed files take up less disk space, allowing you to store more data in the same amount 
            of storage. This is especially useful when dealing with large files or limited storage capacity.
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default CardBody;