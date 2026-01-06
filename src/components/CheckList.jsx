import React, { useEffect, useState } from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material"
import ChecklistIcon from '@mui/icons-material/Checklist';
import DeleteIcon from "@mui/icons-material/Delete"
import axios from "axios"
import CheckListItem from "./CheckListItem"
import {
  fetchCheckListURL,
  addCheckListURL,
  deleteCheckListURL,
} from "../API/checkLists"

const CheckList = ({ card }) => {
  const [checklist, setChecklist] = useState([])
  const [checkListName, setCheckListName] = useState("")
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    const fetchCheckList = async () => {
      if (!card?.id) return
      try {
        const endPoint = fetchCheckListURL(card.id)
        const res = await axios.get(endPoint)
        setChecklist(res.data)
      } catch (error) {
        console.error("Error fetching checklists:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCheckList()
  }, [card.id])

  const handleCloseAddList = () => {
    setOpen(false)
    setCheckListName("")
  }

  const handleAddList = async () => {
    if (!checkListName) return
    setIsAdding(true)
    try {
      const url = addCheckListURL({
        cardId: card.id,
        checkListName,
      })
      const res = await axios.post(url)
      // The API returns the new checklist object. 
      // Ensure it has checkItems array initialized if not present (though usually it's empty)
      const newList = { ...res.data, checkItems: [] }
      setChecklist([...checklist, newList])
      handleCloseAddList()
    } catch (error) {
      console.error("Error adding checklist:", error)
    } finally {
      setIsAdding(false)
    }
  }

  const handleDeleteCheckList = async (list) => {
    setDeletingId(list.id)
    try {
      const url = deleteCheckListURL({ cardId: card.id, listId: list.id })
      await axios.delete(url)
      setChecklist(checklist.filter((l) => l.id !== list.id))
    } catch (error) {
      console.error("Error deleting checklist:", error)
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress size={30} sx={{ color: '#9FADBC' }} />
      </Box>
    )
  }

  return (
    <Box sx={{ width: "100%", mt: 1 }}>
      {checklist.map((list) => (
        <Box
          key={list.id}
          sx={{
            mb: 3,
            color: "#B6C2CF",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1.5,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#9FADBC", display: 'flex', alignItems: 'center', gap: 1 }}>
              <ChecklistIcon />
              {list.name}
            </Typography>
            <Button
              disabled={deletingId === list.id}
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteCheckList(list)
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
                "&.Mui-disabled": {
                    color: "#596773"
                }
              }}
            >
              {deletingId === list.id ? <CircularProgress size={20} sx={{ color: '#B6C2CF' }} /> : "Delete"}
            </Button>
          </Box>
          
          <Box sx={{ pl: 0 }}>
             <CheckListItem checkList={list} />
          </Box>

        </Box>
      ))}
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{
          mt: 2,
          bgcolor: "#579DFF", // Trello blue
          color: "#1D2125",
          fontWeight: "600",
          textTransform: "none",
          "&:hover": {
            bgcolor: "#85B8FF",
          },
        }}
      >
        Add a list
      </Button>

      <Dialog open={open} onClose={handleCloseAddList}
        PaperProps={{
            sx: {
                bgcolor: "#282E33",
                color: "#B6C2CF"
            }
        }}
      >
        <DialogTitle>Add a list</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="List Name"
            fullWidth
            variant="outlined"
            value={checkListName}
            onChange={(e) => setCheckListName(e.target.value)}
            disabled={isAdding}
            sx={{
                '& .MuiOutlinedInput-root': {
                    color: '#B6C2CF',
                    '& fieldset': {
                        borderColor: '#738496',
                    },
                    '&:hover fieldset': {
                        borderColor: '#8590A2',
                    },
                },
                '& .MuiInputLabel-root': {
                    color: '#9FADBC',
                },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddList} sx={{color: "#9FADBC"}} disabled={isAdding}>Cancel</Button>
          <Button onClick={handleAddList} type="submit" variant="contained" disabled={isAdding} sx={{ minWidth: 64 }}>
            {isAdding ? <CircularProgress size={24} color="inherit" /> : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default CheckList
