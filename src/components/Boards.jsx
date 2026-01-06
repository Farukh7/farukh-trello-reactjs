import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import BoardCard from "./BoardCard";
import AddNewBoard from "./AddNewBoard";
import { getBoards, createBoard } from "../api/APICall";

export default function Boards() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    getBoards().then(setBoards);
  }, []);

  const handleCreateBoard = async (name) => {
    const board = await createBoard(name);
    setBoards((prev) => [...prev, board]);
  };

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

        <AddNewBoard onCreate={handleCreateBoard} />
      </Box>
    </>
  );
}
