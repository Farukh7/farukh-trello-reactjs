import { useEffect, useState } from "react";
import ListColumn from "../components/ListColumn";
import { useParams } from "react-router-dom";
import { fetchListsURL, createListURL } from "../API/lists";
import axios from "axios";
import { CircularProgress } from "@mui/material";

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
      setLists([...lists, res.data]);
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
      {/* BOARD TITLE */}
      <div className="px-6 py-4 text-white text-xl font-semibold backdrop-blur-md bg-black/30">
        My Board
      </div>

      {/* LIST CONTAINER */}
      <div className="flex gap-4 px-6 py-4 overflow-x-auto items-start h-[calc(100vh-64px)]">
        {lists.map((list) => (
          <ListColumn key={list.id} id={list.id} title={list.name} />
        ))}

        {/* ADD LIST */}
        {!adding ? (
          <button
            onClick={() => setAdding(true)}
            className="min-w-[272px] h-11
              bg-white/60 hover:bg-white/80
              text-black font-medium rounded-xl
              backdrop-blur-md transition flex items-center justify-center"
          >
            + Add another list
          </button>
        ) : (
          <div className="min-w-[272px] bg-white/80 backdrop-blur-md rounded-xl p-3">
            <input
              autoFocus
              value={title}
              disabled={creatingList}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter list title"
              className="w-full p-2 rounded bg-white text-black outline-none border border-transparent focus:border-blue-500 transition-colors"
              onKeyDown={(e) => e.key === "Enter" && addList()}
            />
            <div className="flex gap-2 mt-2 items-center">
              <button
                onClick={addList}
                disabled={creatingList}
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded text-sm text-white font-medium min-w-[70px] flex justify-center items-center transition-colors disabled:opacity-50"
              >
                {creatingList ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  "Add list"
                )}
              </button>
              <button 
                onClick={() => !creatingList && setAdding(false)}
                className={`text-gray-700 hover:text-black transition-colors ${creatingList && 'cursor-not-allowed opacity-50'}`}
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
