import React from "react";
import { motion } from "framer-motion";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from '@material-ui/core/styles';
import { AlertState } from "../context/AlertContext";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ThankYou = () => {
  const classes = useStyles();

  const { isThankYou, setIsThankYou } = AlertState();

  const handleClose = () => {
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
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={isThankYou}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={isThankYou}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">Thank You</h2>
              <p id="transition-modal-description">
                Your file has been sent!
                <br />
                <small>Valid for 24 hours</small>
              </p>
            </div>
          </Fade>
        </Modal>
      </motion.div>
    </>
  );
};

export default ThankYou;
