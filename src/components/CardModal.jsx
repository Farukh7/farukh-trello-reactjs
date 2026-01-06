import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { MdSubject, MdClose } from "react-icons/md";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "#1d2125",
  color: "white",
  borderRadius: 2,
  p: 3,
};

export default function CardModal({ open, onClose, card, onSave }) {
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState(card.description || "");

  const handleSave = () => {
    onSave({ ...card, description });
    setEditing(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">{card.text}</Typography>
          <IconButton onClick={onClose} sx={{ color: "#9fadbc" }}>
            <MdClose />
          </IconButton>
        </Box>

        {/* Action buttons */}
        <Box display="flex" gap={1} mt={2} mb={3}>
          <Button variant="outlined" size="small">Add</Button>
          <Button variant="outlined" size="small">Labels</Button>
          <Button variant="outlined" size="small">Dates</Button>
          <Button variant="outlined" size="small">Checklist</Button>
          <Button variant="outlined" size="small">Members</Button>
        </Box>

        {/* Description */}
        <Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Box display="flex" gap={1} alignItems="center">
              <MdSubject />
              <Typography fontWeight={600}>Description</Typography>
            </Box>

            {!editing && (
              <Button size="small" onClick={() => setEditing(true)}>
                Edit
              </Button>
            )}
          </Box>

          {!editing ? (
            <Typography sx={{ opacity: 0.8 }}>
              {description || "Add a more detailed description…"}
            </Typography>
          ) : (
            <>
              <textarea
                className="w-full bg-[#22272b] text-white p-2 rounded"
                rows={4}
                autoFocus
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <Box mt={2} display="flex" gap={1}>
                <Button variant="contained" onClick={handleSave}>
                  Save
                </Button>
                <Button onClick={() => setEditing(false)}>Cancel</Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
