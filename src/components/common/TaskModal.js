import { Box, Button, TextField } from "@mui/material";
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

function TaskModal({ handleClose,formik }) {
  return (
    <div>
      <Box sx={style}>
        <h2>Save the Task</h2>
        <form className="form" onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="title"
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Description"
            type="description"
            multiline
            rows={3}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <Button onClick={handleClose} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button color="primary" variant="contained" type="submit">
            Save
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default TaskModal;
