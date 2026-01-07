import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import BoardCard from "./BoardCard";
import AddNewBoard from "./AddNewBoard";
import { getBoards, createBoard } from "../API/APICall";

export default function Boards() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    getBoards()
      .then(setBoards)
      .finally(() => setLoading(false));
  }, []);

  const handleCreateBoard = async (name) => {
    setCreating(true);
    try {
      const board = await createBoard(name);
      setBoards((prev) => [...prev, board]);
    } catch (error) {
      console.error("Error creating board:", error);
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {/* Workspace header */}
      <Typography fontSize={20} fontWeight={700} mb={3}>
        Your boards
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 2,
          maxWidth: 900,
        }}
      >
        {boards.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}

        <AddNewBoard onCreate={handleCreateBoard} loading={creating} />
      </Box>
    </>
  );
}
