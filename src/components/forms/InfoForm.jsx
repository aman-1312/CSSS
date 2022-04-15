import React, { useState } from "react";
import { FormControl, TextField, Grid } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import { motion } from "framer-motion";
import { FileUploadApi, InvokeEmailApi } from "./../../services/Apis";
import { AlertState } from "../../context/AlertContext";
const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#DAA520",
    },
  },
});

const InfoForm = () => {
  const {
    file,
    setIsThankYou,
    setIsUpload,
    setIsForm,
    setFile,
    setFileName,
    setFileType,
    setFileSize,
    setAlert,
  } = AlertState();
  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await FileUploadApi(file);
    if (res.status !== 201) {
      let errMsg = res.data.error;
      setAlert({
        open: true,
        message: errMsg,
        type: "error",
      });
      setLoading(false)
    } else {
      const url = res.data.file.split("/");
      let uuid = url[url.length - 1];
      const invokeEmailService = await InvokeEmailApi(senderInfo, uuid);
      // console.log(invokeEmailService)

      if (invokeEmailService.status !== 200) {
        // let errMsg = res.data.error;
        setAlert({
          open: true,
          message: "Somethig went wrong...email couldn't be sent!",
          type: "error",
        });
        setLoading(false)
      }
      if(invokeEmailService.data.success){
        setLoading(false);
        setIsForm(false);
        setIsUpload(true);
        setIsThankYou(true);
        setFile([]);
        setFileName("");
        setFileType("");
        setFileSize("");
      }
      
    }
  };

  const [loading, setLoading] = useState(false);
  const [senderInfo, setSenderInfo] = useState({
    destination: "",
    source: "",
  })
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setSenderInfo({ ...senderInfo, [name]: value });
  }
  return (
    <>
      <motion.div
        className="section-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <p>Enter email with which you want to share the file</p>

        <div className="infoFormDiv">
          <ThemeProvider theme={theme}>
            <form>
              <Grid>
                <FormControl>
                  <InputLabel htmlFor="input-with-icon-adornment">
                    Destination
                  </InputLabel>
                  <Input
                    id="input-with-icon-adornment"
                    startAdornment={
                      <InputAdornment position="start">
                        <SendIcon />
                      </InputAdornment>
                    }
                    color="primary"
                    name="destination"
                    value={senderInfo.destination}
                    type="email"
                    placeholder="xyz@mail.com"
                    onChange={handleInputChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid>
                <FormControl style={{ marginTop: "1em" }}>
                  <InputLabel htmlFor="input-with-icon-adornment">
                    Source
                  </InputLabel>
                  <Input
                    id="input-with-icon-adornment"
                    startAdornment={
                      <InputAdornment position="start">
                        <SendIcon />
                      </InputAdornment>
                    }
                    color="primary"
                    name="source"
                    value={senderInfo.source}
                    type="email"
                    placeholder="xyz@mail.com"
                    onChange={handleInputChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid>
                {loading ? (
                  <>
                  <CircularProgress style={{ marginTop: '1em' }} color="secondary" />
                  <p style={{ textAlign: 'center' }} >Upload File & Sending Email</p>
                  </>
                ) : (
                  <IconButton
                    aria-label="Next Step"
                    type="submit"
                    style={{ marginTop: "1em" }}
                    onClick={submitForm}
                  >
                    SEND
                    <SendIcon
                      style={{ color: "goldenrod", fontSize: "1.2em" }}
                    />
                  </IconButton>
                )}
              </Grid>
            </form>
          </ThemeProvider>
        </div>
      </motion.div>
    </>
  );
};

export default InfoForm;
