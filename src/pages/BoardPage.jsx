import { useEffect, useState } from "react";
import ListColumn from "../components/ListColumn";
import { useParams } from "react-router-dom";
import { fetchListsURL, createListURL } from "../API/lists";
import axios from "axios";
import { CircularProgress, Button } from "@mui/material";

export default function BoardPage() {
  const { id } = useParams();
  const [lists, setLists] = useState([]);
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [creatingList, setCreatingList] = useState(false);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const endPoint = fetchListsURL(id);
        const board = await axios.get(endPoint);
        setLists(board.data);
      } catch (error) {
        console.error("Error fetching board lists:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBoard();
  }, [id]);

  const addList = async () => {
    if (!title.trim()) return;
    setCreatingList(true);
    try {
      const url = createListURL({ boardID: id, listName: title });
      const res = await axios.post(url);
      setLists((prev) => [...prev, res.data]);
      setTitle("");
      setAdding(false);
    } catch (error) {
      console.error("Error creating list:", error);
    } finally {
      setCreatingList(false);
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee)",
        }}
      >
        <CircularProgress sx={{ color: "white" }} />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee)",
      }}
    >
      {/* BOARD HEADER */}
      <div className="px-4 py-3 text-white text-lg font-semibold backdrop-blur-md bg-black/30 sticky top-0 z-10">
        My Board
      </div>

      {/* LIST CONTAINER (X-scroll enabled) */}
      <div
        className="
          flex gap-4 px-4 py-4
          overflow-x-auto overflow-y-hidden
          items-start
          h-[calc(100dvh-56px)]
          whitespace-nowrap
        "
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {lists.map((list) => (
          <div key={list.id} className="shrink-0">
            <ListColumn id={list.id} title={list.name} />
          </div>
        ))}

        {/* ADD LIST */}
        {!adding ? (
          <Button
            onClick={() => setAdding(true)}
            sx={{
              width: { xs: 260, sm: 280 },
              minWidth: { xs: 260, sm: 280 },
              height: 44,
              flexShrink: 0,
              bgcolor: "rgba(255,255,255,0.9)",
              color: "#1D2125",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 2,
              "&:hover": { bgcolor: "#fff" },
            }}
          >
            + Add another list
          </Button>
        ) : (
          <div className="w-65 sm:w-70 shrink-0 bg-white/80 backdrop-blur-md rounded-xl p-3">
            <input
              autoFocus
              value={title}
              disabled={creatingList}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter list title"
              className="w-full p-2 rounded bg-white text-black outline-none border border-transparent focus:border-blue-500"
              onKeyDown={(e) => e.key === "Enter" && addList()}
            />
            <div className="flex gap-2 mt-2 items-center">
              <button
                onClick={addList}
                disabled={creatingList}
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded text-sm text-white font-medium min-w-17.5 flex justify-center items-center"
              >
                {creatingList ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  "Add list"
                )}
              </button>
              <button
                onClick={() => !creatingList && setAdding(false)}
                className="text-gray-700 hover:text-black"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
