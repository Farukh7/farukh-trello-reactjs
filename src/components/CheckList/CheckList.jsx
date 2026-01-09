import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import ChecklistIcon from "@mui/icons-material/Checklist";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import CheckListItem from "./CheckListItem";
import {
  fetchCheckListURL,
  addCheckListURL,
  deleteCheckListURL,
} from "../../API/checkLists";

const CheckList = ({ card }) => {
  const [checklist, setChecklist] = useState([]);
  const [checkListName, setCheckListName] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  // delete confirmation state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchCheckList = async () => {
      if (!card?.id) return;
      try {
        const res = await axios.get(fetchCheckListURL(card.id));
        setChecklist(res.data);
      } catch (error) {
        console.error("Error fetching checklists:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCheckList();
  }, [card?.id]);

  const handleCloseAddList = () => {
    setOpen(false);
    setCheckListName("");
  };

  const handleAddList = async () => {
    if (!checkListName.trim()) return;
    setIsAdding(true);
    try {
      const res = await axios.post(
        addCheckListURL({
          cardId: card.id,
          checkListName,
        })
      );

      setChecklist((prev) => [...prev, { ...res.data, checkItems: [] }]);

      handleCloseAddList();
    } catch (error) {
      console.error("Error adding checklist:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!listToDelete) return;
    setDeletingId(listToDelete.id);
    try {
      await axios.delete(
        deleteCheckListURL({
          cardId: card.id,
          listId: listToDelete.id,
        })
      );
      setChecklist((prev) => prev.filter((l) => l.id !== listToDelete.id));
      setConfirmOpen(false);
      setListToDelete(null);
    } catch (error) {
      console.error("Error deleting checklist:", error);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress size={30} sx={{ color: "#9FADBC" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", mt: 1 }}>
      {checklist.map((list) => (
        <Box key={list.id} sx={{ mb: 3, color: "#B6C2CF" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1.5,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#9FADBC",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <ChecklistIcon />
              {list.name}
            </Typography>

            <Button
              onClick={() => {
                setListToDelete(list);
                setConfirmOpen(true);
              }}
              sx={{
                minWidth: "auto",
                px: 2,
                py: 0.5,
                bgcolor: "#2F353C",
                color: "#B6C2CF",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#3F464E",
                  color: "#e6e6e6",
                },
              }}
            >
              Delete
            </Button>
          </Box>

          <CheckListItem checkList={list} />
        </Box>
      ))}

      {/* ➕ Add list button */}
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{
          mt: 2,
          bgcolor: "#579DFF",
          color: "#1D2125",
          fontWeight: 600,
          textTransform: "none",
          "&:hover": {
            bgcolor: "#85B8FF",
          },
        }}
      >
        Add a list
      </Button>

      {/* ➕ Add list dialog (FIXED) */}
      <Dialog
        open={open}
        onClose={handleCloseAddList}
        disableEnforceFocus
        disableRestoreFocus
        PaperProps={{
          sx: {
            bgcolor: "#282E33",
            color: "#B6C2CF",
          },
        }}
      >
        <DialogTitle>Add a list</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="List Name"
            fullWidth
            value={checkListName}
            onChange={(e) => setCheckListName(e.target.value)}
            disabled={isAdding}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseAddList}
            sx={{ color: "#9FADBC" }}
            disabled={isAdding}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddList}
            variant="contained"
            disabled={isAdding}
          >
            {isAdding ? <CircularProgress size={24} color="inherit" /> : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete confirmation dialog (FIXED) */}
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        disableEnforceFocus
        disableRestoreFocus
        PaperProps={{
          sx: {
            bgcolor: "#282E33",
            color: "#B6C2CF",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Delete checklist?</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: "#9FADBC" }}>
            Are you sure you want to delete{" "}
            <strong>{listToDelete?.name}</strong>? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmOpen(false)}
            sx={{ color: "#9FADBC" }}
            disabled={deletingId}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            disabled={deletingId}
            startIcon={
              deletingId ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <DeleteIcon />
              )
            }
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CheckList;
