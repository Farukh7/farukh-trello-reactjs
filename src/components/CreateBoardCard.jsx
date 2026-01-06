import { Box } from "@mui/material";

export default function CreateBoardCard() {
  return (
    <Box
      sx={{
        width: 192,
        height: 96,
        borderRadius: 2,
        bgcolor: "#2C333A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#9FADBC",
        cursor: "pointer",
        "&:hover": { bgcolor: "#3A4047" },a
      }}
    >
      Create new board
    </Box>
  );
}
