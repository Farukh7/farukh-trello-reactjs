import { Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Board = ({ board }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/boards/${board.id}`)}
      sx={{
        height: 120,
        cursor: "pointer",
        background: `url(${board.image})`,
        backgroundSize: "cover",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0,0,0,0.35)",
        }}
      />
      <CardContent sx={{ position: "relative", zIndex: 1 }}>
        <Typography color="#fff" fontWeight={600}>
          {board.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Board;
