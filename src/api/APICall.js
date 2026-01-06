import axios from "axios";

const api = axios.create({
  baseURL: "/trello",
  params: {
    key: import.meta.env.VITE_TRELLO_KEY,
    token: import.meta.env.VITE_TRELLO_TOKEN,
  },
});


const FALLBACK_BG =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee";

/**
 * Get all boards
 */
export const getBoards = async () => {
  const { data } = await api.get("/members/me/boards");

  return data.map((board) => ({
    id: board.id,
    name: board.name,
    background:
      board.prefs?.backgroundImage ||
      board.prefs?.backgroundColor ||
      FALLBACK_BG,
  }));
};

/**
 * Create board
 */
export const createBoard = async (name) => {
  const { data } = await api.post("/boards", null, {
    params: { name },
  });

  return {
    id: data.id,
    name: data.name,
    background: FALLBACK_BG,
  };
};

/**
 * ✅ FIXED: Get board by ID
 */
export const getBoardById = async (boardId) => {
  const { data } = await api.get(`/boards/${boardId}`);

  return {
    id: data.id,
    name: data.name,
    background:
      data.prefs?.backgroundImage || data.prefs?.backgroundColor || FALLBACK_BG,
  };
};
