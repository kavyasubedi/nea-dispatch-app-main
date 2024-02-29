import * as React from "react";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SimpleModal = ({ title, buttonType, componentId }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="p-2">
      <div className={buttonType} onClick={handleOpen}>
        {title}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div id="modal-modal-title" variant="h6" component="h2">
            {title}
          </div>
          <div id="modal-modal-body" variant="h6" component="h2">
            hello
          </div>
          <div id="modal-modal-description" sx={{ mt: 2 }}>
            {componentId}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SimpleModal;
