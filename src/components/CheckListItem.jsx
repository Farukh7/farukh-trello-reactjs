import React, { useEffect, useState } from "react"
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
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import axios from "axios"
import { deleteCheckItemURL, addCheckItemURL, updateCheckItemStateURL } from "../API/checkLists"



const CheckListItem = ({ checkList }) => {
  const [items, setItems] = useState([])
  const [newCheckItem, setNewCheckItem] = useState("")
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isAdding, setIsAdding] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    if (checkList && checkList.checkItems) {
      setItems(checkList.checkItems)
    }
  }, [checkList])

  useEffect(() => {
    updateProgress(items)
  }, [items])

  const updateProgress = (currentItems) => {
    const completedItems = currentItems.filter(
      (item) => item.state === "complete"
    ).length
    const totalItems = currentItems.length
    const newProgress = totalItems ? (completedItems / totalItems) * 100 : 0
    setProgress(newProgress)
  }

  const handleAddCheckItem = async () => {
    if (!newCheckItem) return
    setIsAdding(true)
    try {
      const url = addCheckItemURL({
        checkListId: checkList.id,
        itemName: newCheckItem,
      })
      const res = await axios.post(url)
      setItems((prev) => [...prev, res.data])
      setNewCheckItem("")
      setOpen(false)
    } catch (error) {
      console.error("Error adding check item:", error)
    } finally {
      setIsAdding(false)
    }
  }

  const handleDeleteCheckItem = async (itemId) => {
    setDeletingId(itemId)
    try {
      const url = deleteCheckItemURL({ checkListId: checkList.id, itemId })
      await axios.delete(url)
      setItems((prev) => prev.filter((item) => item.id !== itemId))
    } catch (error) {
      console.error("Error deleting check item:", error)
    } finally {
      setDeletingId(null)
    }
  }

  const handleCheckItemStateChange = async (itemId, currentState) => {
    const newState = currentState === "complete" ? "incomplete" : "complete"
    try {
      // Optimistic update
      setItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, state: newState } : item
        )
      )

      const url = updateCheckItemStateURL({
        cardId: checkList.idCard,
        itemId,
        state: newState,
      })
      await axios.put(url)
    } catch (error) {
      console.error("Error updating check item state:", error)
      // Revert if failed
      setItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, state: currentState } : item
        )
      )
    }
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box display="flex" alignItems="center" mb={1.5}>
          <Typography variant="body2" sx={{ minWidth: "35px", color: "#9FADBC" }}>
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
              bgcolor: "#3F464E", // Darker track
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#579DFF", // Brand blue
              },
            }}
          />
      </Box>

      {items.map((item) => (
        <Box 
            key={item.id} 
            display="flex" 
            alignItems="center" 
            mb={0.5}
            sx={{
                '&:hover .delete-btn': { opacity: 1 }
            }}
        >
          <Checkbox
            checked={item.state === "complete"}
            onChange={() => handleCheckItemStateChange(item.id, item.state)}
            sx={{
                color: "#9FADBC",
                '&.Mui-checked': {
                    color: "#579DFF",
                },
                padding: "4px 8px 4px 0"
            }}
          />
          <Typography
            sx={{
              textDecoration: item.state === "complete" ? "line-through" : "none",
              color: item.state === "complete" ? "#596773" : "#B6C2CF",
              flexGrow: 1,
              fontSize: "0.95rem"
            }}
          >
            {item.name}
          </Typography>
          <Button
            className="delete-btn"
            disabled={deletingId === item.id}
            sx={{ 
                minWidth: "auto", 
                padding: "4px", 
                color: "#9FADBC", 
                opacity: 0, 
                transition: "opacity 0.2s",
                "&:hover": { color: "#e6e6e6", bgcolor: "rgba(255,255,255,0.08)" }
            }}
            onClick={() => handleDeleteCheckItem(item.id)}
          >
             {deletingId === item.id ? (
                 <CircularProgress size={16} sx={{ color: '#9FADBC' }} />
             ) : (
                <DeleteIcon fontSize="small" />
             )}
          </Button>
        </Box>
      ))}

      {open ? (
         <Box sx={{ mt: 1 }}>
             <TextField
                autoFocus
                fullWidth
                placeholder="Add an item"
                value={newCheckItem}
                onChange={(e) => setNewCheckItem(e.target.value)}
                disabled={isAdding}
                sx={{
                    mb: 1,
                    '& .MuiOutlinedInput-root': {
                        color: '#B6C2CF',
                        bgcolor: "#22272B",
                        '& fieldset': { borderColor: '#579DFF', borderWidth: 2 },
                        '&:hover fieldset': { borderColor: '#579DFF' },
                        '&.Mui-focused fieldset': { borderColor: '#579DFF' },
                        '&.Mui-disabled': { color: '#738496' } 
                    }
                }}
             />
             <Box sx={{ display: 'flex', gap: 1 }}>
                 <Button 
                    variant="contained" 
                    onClick={handleAddCheckItem}
                    disabled={isAdding}
                    sx={{ bgcolor: "#579DFF", color: "#1D2125", textTransform: "none", fontWeight: 600, "&:hover": { bgcolor: "#85B8FF" }, minWidth: 60 }}
                 >
                    {isAdding ? <CircularProgress size={20} sx={{color: '#1D2125'}} /> : "Add"}
                 </Button>
                 <Button 
                    onClick={() => setOpen(false)}
                    disabled={isAdding}
                    sx={{ color: "#9FADBC", textTransform: "none", "&:hover": { color: "#B6C2CF" } }}
                 >
                    Cancel
                 </Button>
             </Box>
         </Box>
      ) : (
          <Button 
            onClick={() => setOpen(true)} 
            sx={{
                mt: 1,
                bgcolor: "#2F353C",
                color: "#B6C2CF",
                textTransform: "none",
                justifyContent: "flex-start",
                px: 2,
                py: 0.75,
                "&:hover": {
                    bgcolor: "#3F464E",
                    color: "#e6e6e6"
                }
            }}
          >
            Add an item
          </Button>
      )}

    </Box>
  )
}

export default CheckListItem

