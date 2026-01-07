import { Card } from "@mui/material";
import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import CardDialog from "./CardDialog";
import { markListComplete } from "../API/lists";
import axios from "axios";

export default function CardItem({ id, text, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(text);
  const [completed, setCompleted] = useState(false);

  const handleMarkComplete = async (e) => {
    e.stopPropagation(); // 🚫 prevent card open

    const newStatus = !completed;
    setCompleted(newStatus);

    try {
      const endpoint = markListComplete(id);
      await axios.put(endpoint, { dueComplete: newStatus });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* CARD PREVIEW */}
      <Card
        sx={{
          mb: 1,
          background: "rgba(255,255,255,0.15)",
          color: "white",
          cursor: "pointer",
          borderRadius: "10px",
        }}
        onClick={() => setOpen(true)}
      >
        <div className="p-2 flex items-center gap-2">
          
          {/* ✅ Circular Checkbox */}
          <span
            onClick={handleMarkComplete}
            className={`
              w-5 h-5 flex items-center justify-center
              rounded-full border
              transition-all
              ${
                completed
                  ? "bg-green-500 border-green-500"
                  : "border-white/60 hover:border-white"
              }
            `}
          >
            {completed && <FiCheck size={12} />}
          </span>

          {/* Card title */}
          <span
            className={`text-sm ${
              completed ? "line-through opacity-60" : ""
            }`}
          >
            {title}
          </span>
        </div>
      </Card>

      {/* CARD MODAL */}
      <CardDialog
        open={open}
        onClose={() => setOpen(false)}
        card={{ id, title }}
      />
    </>
  );
}
