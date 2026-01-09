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
  CircularProgress,
} from "@mui/material";

export default function AddNewBoard({ onCreate, loading }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleCreate = async () => {
    if (!name.trim()) return;
    await onCreate(name.trim());
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
        onClose={() => !loading && setOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Create board</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Board name"
            disabled={loading}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && handleCreate()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleCreate} disabled={loading} sx={{ minWidth: 80 }}>
            {loading ? <CircularProgress size={24} color="inherit" /> : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
