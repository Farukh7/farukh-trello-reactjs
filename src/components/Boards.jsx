import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import BoardCard from "./BoardCard";
import AddNewBoard from "./AddNewBoard";
import { createBoardURL, fetchBoardsURL } from "../API/board";
import axios from "axios";

export default function Boards() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        setLoading(true);

        const endpoint = fetchBoardsURL();

        const response = await axios.get(endpoint);

        const parsedBoardsData = response?.data?.map((board) => ({
          id: board.id,
          name: board.name,
          background:
            board.prefs?.backgroundImage ||
            board.prefs?.backgroundColor ||
            FALLBACK_BG,
        }));

        setBoards(parsedBoardsData ?? []);
      } catch (error) {
        console.error("Error fetching boards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, []);

  const createBoard = async (name) => {
    const BG_URL =
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee";
    const endPoint = createBoardURL(name);
    const { data } = await axios.post(endPoint);

    return {
      id: data.id,
      name: data.name,
      background: BG_URL,
    };
  };

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
        {boards.length > 0 &&
          boards.map((board) => <BoardCard key={board.id} board={board} />)}

        <AddNewBoard onCreate={handleCreateBoard} loading={creating} />
      </Box>
    </>
  );
}
