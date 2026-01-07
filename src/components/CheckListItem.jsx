import React, { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Typography,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import {
  deleteCheckItemURL,
  addCheckItemURL,
  updateCheckItemStateURL,
} from "../API/checkLists";

const CheckListItem = ({ checkList }) => {
  const [items, setItems] = useState([]);
  const [newCheckItem, setNewCheckItem] = useState("");
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  //  delete popup state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    if (checkList?.checkItems) {
      setItems(checkList.checkItems);
    }
  }, [checkList]);

  useEffect(() => {
    const completed = items.filter((i) => i.state === "complete").length;
    setProgress(items.length ? (completed / items.length) * 100 : 0);
  }, [items]);

  const handleAddCheckItem = async () => {
    if (!newCheckItem) return;
    setIsAdding(true);
    try {
      const res = await axios.post(
        addCheckItemURL({
          checkListId: checkList.id,
          itemName: newCheckItem,
        })
      );
      setItems((prev) => [...prev, res.data]);
      setNewCheckItem("");
      setOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAdding(false);
    }
  };

  //  open delete popup
  const handleOpenDelete = (item) => {
    setItemToDelete(item);
    setConfirmOpen(true);
  };

  //  confirm delete
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    setDeletingId(itemToDelete.id);
    try {
      await axios.delete(
        deleteCheckItemURL({
          checkListId: checkList.id,
          itemId: itemToDelete.id,
        })
      );
      setItems((prev) => prev.filter((item) => item.id !== itemToDelete.id));
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
      setConfirmOpen(false);
      setItemToDelete(null);
    }
  };

  const handleCheckItemStateChange = async (itemId, currentState) => {
    const newState = currentState === "complete" ? "incomplete" : "complete";
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, state: newState } : item
      )
    );

    try {
      await axios.put(
        updateCheckItemStateURL({
          cardId: checkList.idCard,
          itemId,
          state: newState,
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Progress bar (unchanged) */}
      <Box display="flex" alignItems="center" mb={1.5}>
        <Typography sx={{ minWidth: 35, color: "#9FADBC" }}>
          {Math.round(progress)}%
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            width: "100%",
            height: 6,
            borderRadius: 4,
            ml: 1,
            bgcolor: "#3F464E",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#579DFF",
            },
          }}
        />
      </Box>

      {/* Checklist items */}
      {items.map((item) => (
        <Box
          key={item.id}
          display="flex"
          alignItems="center"
          mb={0.5}
          sx={{ "&:hover .delete-btn": { opacity: 1 } }}
        >
          <Checkbox
            checked={item.state === "complete"}
            onChange={() => handleCheckItemStateChange(item.id, item.state)}
          />
          <Typography
            sx={{
              flexGrow: 1,
              color: item.state === "complete" ? "#596773" : "#B6C2CF",
              textDecoration:
                item.state === "complete" ? "line-through" : "none",
            }}
          >
            {item.name}
          </Typography>

          {/* 🗑️ Delete icon */}
          <Button
            className="delete-btn"
            sx={{ opacity: 0 }}
            onClick={() => handleOpenDelete(item)}
          >
            {deletingId === item.id ? (
              <CircularProgress size={16} />
            ) : (
              <DeleteIcon fontSize="small" />
            )}
          </Button>
        </Box>
      ))}

      {/* Add item UI */}
      {open ? (
        <Box sx={{ mt: 1 }}>
          <TextField
            autoFocus
            fullWidth
            placeholder="Add an item"
            value={newCheckItem}
            onChange={(e) => setNewCheckItem(e.target.value)}
          />
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <Button variant="contained" onClick={handleAddCheckItem}>
              Add
            </Button>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </Box>
        </Box>
      ) : (
        <Button onClick={() => setOpen(true)}>Add an item</Button>
      )}

      {/* Delete confirmation popup */}
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        disableEnforceFocus
        disableRestoreFocus
        PaperProps={{
          sx: { bgcolor: "#282E33", color: "#B6C2CF" },
        }}
      >
        <DialogTitle>Delete item?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            <strong>{itemToDelete?.name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CheckListItem;
