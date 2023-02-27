import {
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useTaskTimer } from "../../hooks/useTaskTimer";
import TaskModal from "../common/TaskModal";
import { useFormik } from "formik";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as yup from "yup";
import DeleteModal from "../common/DeleteModal";

const Schema = yup.object({
  title: yup.string("Enter your title").required("Title is required"),
  description: yup
    .string("Enter your description")
    .min(8, "description should be of minimum 8 characters length")
    .required("description is required"),
});

function Timer() {
  const {
    time,
    setTime,
    isOn,
    setIsOn,
    timePerTask,
    setTimePerTask,
    currTaskTime,
    setCurrTaskTime,
  } = useTaskTimer();
  const ref = useRef();
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [taskDetails, setTaskDetails] = useState([]);
  const [editData, setEditData] = useState();
  const [deleteId, setDeleteId] = useState();

  const handleOpen = () => setOpen(true);

  const handleDeleteModalClose = () => {
    setDeleteModal(false);
    deleteId();
  };

  const handleClose = () => {
    setTimePerTask();
    setOpen(false);
    formik.resetForm();
    editData();
  };

  useEffect(() => {
    if (isOn) {
      ref.current = setInterval(() => {
        setTime((time) => time + 1);
        setCurrTaskTime((currTaskTime) => currTaskTime + 1);
      }, 1000);
    } else {
      clearInterval(ref.current);
    }
    return () => clearInterval(ref.current);
  }, [isOn]);

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  const showTime = (time) => {
    const seconds = time % 60;
    const mins = Math.floor(seconds / 60);
    const hours = Math.floor(mins / 60);
    return (
      addZero(hours) +
      ":" +
      addZero(mins) +
      ":" +
      (seconds == 0 ? "00" : addZero(seconds))
    );
  };

  const handleSave = () => {
    setIsOn(false);
    handleOpen();
    setTimePerTask(showTime(currTaskTime));
  };

  const handleIsOn = () => {
    setIsOn(!isOn);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      if (editData) {
        let data = [...taskDetails];
        data[editData.id] = { ...data[editData.id], ...values };
        setTaskDetails(data);
      } else {
        setTaskDetails([...taskDetails, { ...values, time: timePerTask }]);
        setCurrTaskTime(0);
      }
      handleClose();
    },
  });

  const handleEdit = (row, idx) => {
    setEditData({ ...row, id: idx });
    formik.setFieldValue("title", row.title);
    formik.setFieldValue("description", row.description);
    handleOpen();
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const handleDeleteTask = () => {
    let data = [...taskDetails];
    data.splice(deleteId, 1);
    setTaskDetails(data);
    handleDeleteModalClose()
  };

  return (
    <div>
      <h1>Timer</h1>
      <h2>Total Time Tracked</h2>
      <h3>{showTime(time)}</h3>
      <h2>Time Tracked in Current Task</h2>
      <h3>{showTime(currTaskTime)}</h3>
      <div className="btn-wrapper">
        <Button disabled={isOn} onClick={handleIsOn} variant="outlined">
          START
        </Button>
        <Button disabled={!isOn} onClick={handleIsOn} variant="contained">
          STOP
        </Button>
        <Button
          disabled={currTaskTime === 0}
          onClick={handleSave}
          variant="contained"
        >
          Save
        </Button>
      </div>
      <div>
        <h1>Task Section</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Time</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            {taskDetails?.length ? (
              <TableBody>
                {taskDetails?.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell align="right">{row.description}</TableCell>
                    <TableCell align="right">{row.time}</TableCell>
                    <TableCell align="right">
                      <span
                        onClick={() => handleEdit(row, index)}
                        className="action-icon"
                      >
                        <EditIcon />
                      </span>
                      <span
                        onClick={() => handleDelete(index)}
                        className="action-icon"
                      >
                        <DeleteIcon />
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <div>No Task Found</div>
            )}
          </Table>
        </TableContainer>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <TaskModal handleClose={handleClose} formik={formik} />
      </Modal>
      <Modal
        open={deleteModal}
        onClose={handleDeleteModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DeleteModal
          handleClose={handleDeleteModalClose}
          handleDelete={handleDeleteTask}
        />
      </Modal>
    </div>
  );
}

export default Timer;
