import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import CheckList from "../CheckList/CheckList";

const CardDialog = ({ open, onClose, card }) => {
  if (!card) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          bgcolor: "#282E33",
          color: "#B6C2CF",
          borderRadius: "12px",
          backgroundImage: "none",
        },
      }}
    >
      <DialogTitle
        sx={{
          color: "#B6C2CF",
          fontWeight: 600,
          borderBottom: "1px solid #384148",
        }}
      >
        Checklist for {card.title}
      </DialogTitle>
      <DialogContent sx={{ mt: 2, minHeight: "400px" }}>
        <CheckList card={card} />
      </DialogContent>
      <DialogActions sx={{ borderTop: "1px solid #384148", padding: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            color: "#B6C2CF",
            "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CardDialog;
