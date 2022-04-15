import React from "react";
import { Avatar } from "@material-ui/core";
import PlayCircleFilledRoundedIcon from "@material-ui/icons/PlayCircleFilledRounded";
import IconButton from "@material-ui/core/IconButton";
import folder from "../folders.png";
import { AlertState } from "../context/AlertContext";
import { motion } from "framer-motion";
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";
const FileInfo = ({ fileName, fileSize, fileType }) => {
  let split = fileType.split("/");
  let fileFormat = split["1"];
  let fileSizeInMb = (fileSize * 0.000001).toFixed(2);

  const { setIsForm, setIsUpload, setIsThankYou } = AlertState();

  const nextStep = () => {
    setIsForm(true);
    setIsUpload(false);
    setIsThankYou(false);
  };
  return (
    <>
      <motion.div
        className="section-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <p>Got files? Share it like fake news!</p>
        <div className="fileInfoDiv">
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <Avatar alt="file type" className="fileLogo" src={folder} />
            </Grid>
            <Grid item xs={8}>
              <p>
                {fileName}
                {"    "}
                {fileSizeInMb} Mb
              </p>
            </Grid>
          </Grid>
        </div>
        <IconButton aria-label="Next Step" onClick={nextStep}>
          Next Step
          <PlayCircleFilledRoundedIcon
            style={{ color: "goldenrod", fontSize: "2em" }}
          />
        </IconButton>
      </motion.div>
    </>
  );
};

export default FileInfo;
