import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import api from "../../../Axios";
import SimpleTable from "../../../components/table/SimpleTable";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  minWidth: "450px",
  bgcolor: "background.transparent",
  border: "0px solid #000",
  boxShadow: 0,
  p: 0,
};

const ViewPopUp = ({ title, buttonType, data }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  const columns = [
    {
      name: "id",
      label: "ID",
    },
    {
      name: "status",
      label: "Status",
    },
    {
      name: "publicationDate",
      label: "Publication Date",
    },
    // {
    //   type: "closure",
    //   label: "Employee",
    //   closure: getEmployee,
    // },
    // {
    //   type: "closure",
    //   label: "Dispatch",
    //   closure: getDipatch,
    // },
    {
      name: "remark",
      label: "Remarks",
    },
  ];
  return (
    <div className="">
      <button className={buttonType} onClick={handleOpen}>
        {title}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="card p-2" style={{ overflowY: 'scroll' }}>
            <div
              className="card-header h4"
              style={{ border: "0", backgroundColor: "white" }}
            >
              {title}
            </div>
            <div className="card-body">
              <SimpleTable columns={columns} data={data} />

            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ViewPopUp;
