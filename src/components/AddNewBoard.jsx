import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Card,
  Typography,
} from "@mui/material";

export default function AddNewBoard({ onCreate }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleCreate = () => {
    if (!name.trim()) return;
    onCreate(name.trim());
    setName("");
    setOpen(false);
  };

  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        sx={{
          width: 240,
          height: 140,
          borderRadius: 2,
          bgcolor: "#2C333A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#9FADBC",
          "&:hover": { bgcolor: "#3A4148" },
        }}
      >
        <Typography fontWeight={600}>Create new board</Typography>
      </Card>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Create board</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Board name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreate}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
