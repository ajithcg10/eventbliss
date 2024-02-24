"use client";
 
import { UploadButton, UploadDropzone ,useUploadThing} from "@app/utils/uploadthing";
import { Button } from "@components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";

type FileProps = {
  setFile:(value:string)=> void;
  file:string;
}
 
export default function FileUploader({setFile,file}:FileProps) {


  
  return (
    <main>
     
      {file ? (
        <div className="flex h-full w-full flex-1 justify-center ">
          <img
            src={file}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />
        </div>
      ) : (

        <div className="flex-center flex-col py-5 text-grey-500">
         <img src="/assets/icons/upload.svg" width={77} height={77} alt="file upload" />
              <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
          <UploadButton
       
        endpoint="imageUploader"
        onClientUploadComplete={(res:any) => {
          // Do something with the response
          console.log("Files: ", res);
          setFile(res[0].url)
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
         </div>
        
        
      



         
      
      )}

    </main>
  );
}