import React, { Children } from "react";
import { createContext, useContext, useState, useEffect } from "react";

const Alert = createContext();
const AlertContext = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const [isForm, setIsForm] = useState(false);
  const [isThankYou, setIsThankYou] = useState(false);

  const [file, setFile] = useState([]);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [isUpload, setIsUpload] = useState(true);
  return (
    <Alert.Provider
      value={{
        alert,
        setAlert,
        isForm,
        setIsForm,
        isThankYou,
        setIsThankYou,
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
      }}
    >
      {children}
    </Alert.Provider>
  );
};

export default AlertContext;

export const AlertState = () => {
  return useContext(Alert);
};

