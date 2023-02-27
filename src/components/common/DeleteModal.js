import { Box, Button } from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function DeleteModal({ handleClose, handleDelete }) {
  return (
    <div>
      <Box sx={style}>
        <p>Are you sure you want to Delete This task</p>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleDelete}>
          Delete
        </Button>
      </Box>
    </div>
  );
}

export default DeleteModal;
