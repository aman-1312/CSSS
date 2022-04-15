import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import FileInfo from "./FileInfo";
import { AlertState } from "../context/AlertContext";
import { motion } from "framer-motion";
// *****
//if dragging folder or some file which is not accepted then error should show -> not working
// *****
const FileUpload = () => {
  const {
    file,
    setFile,
    fileName,
    setFileName,
    fileType,
    setFileType,
    fileSize,
    setFileSize,
    isUpload,
    setIsUpload,
  } = AlertState();

  const handleDrop = (acceptedFile) => {
    setFile(acceptedFile);
    setFileName(acceptedFile[0].name);
    setFileType(acceptedFile[0].type);
    setFileSize(acceptedFile[0].size);
    // console.log(acceptedFile)
  };

  return (
    <>
      <motion.div
        className="section-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Dropzone
          onDrop={handleDrop}
          // accept="image/*, audio/*, video/*, .doc, .docx, .pdf, .psd, .zip, .rar"
          // minSize={1024}
          maxSize={536870912}
          multiple={false}
        >
          {({
            getRootProps,
            getInputProps,
            isDragActive,
            isDragAccept,
            isDragReject,
          }) => {
            const additionalClass = isDragAccept
              ? "accept"
              : isDragReject
              ? "reject"
              : "";

            return (
              <div
                {...getRootProps({
                  className: `dropzone ${additionalClass}`,
                })}
              >
                <input {...getInputProps()} />
                <span>{isDragActive ? "📂" : "📁"}</span>
                <p>
                  Drag {"&"} drop images, or click to select files.
                  <br />
                  Supported upto 512MB
                </p>
              </div>
            );
          }}
        </Dropzone>
        {fileName ? (
          <FileInfo
            fileName={fileName}
            fileSize={fileSize}
            fileType={fileType}
          />
        ) : null}
      </motion.div>
    </>
  );
};

export default FileUpload;
