import { Card, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function BoardCard({ board }) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/boards/${board.id}`)}
      sx={{
        width: 240,
        height: 140,
        cursor: "pointer",
        borderRadius: 2,
        backgroundImage: `url(${board.background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 6,
        },
        transition: "all 0.2s ease",
      }}
    >
      {/* Dark overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0,0,0,0.35)",
        }}
      />

      {/* Board name */}
      <Box
        sx={{
          position: "absolute",
          bottom: 12,
          left: 12,
          zIndex: 1,
        }}
      >
        <Typography color="#fff" fontWeight={600}>
          {board.name}
        </Typography>
      </Box>
    </Card>
  );
}
