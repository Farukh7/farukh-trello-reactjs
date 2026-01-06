import {
  Card,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { FiEdit2, FiAlignLeft } from "react-icons/fi";
import CardDialog from "./CardDialog";


export default function CardItem({ id, text, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(text);

  const [description, setDescription] = useState("");
  const [editingDesc, setEditingDesc] = useState(true);
  const [tempDesc, setTempDesc] = useState("");

  const saveTitle = () => {
    if (!title.trim()) return;
    onUpdate(title);
  };

  const startEditDescription = () => {
    setTempDesc(description);
    setEditingDesc(true);
  };

  const saveDescription = () => {
    setDescription(tempDesc);
    setEditingDesc(false);
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
        <div className="p-2 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full border border-white/60" />
            <span className="text-sm">{title}</span>
          </div>

          <div className="flex items-center gap-1">
            {description && (
              <Tooltip title="This card has a description.">
                <span>
                  <FiAlignLeft className="text-white/70" />
                </span>
              </Tooltip>
            )}
            <FiEdit2 className="text-white/70" />
          </div>
        </div>
      </Card>

      {/* CARD MODAL */}
      <CardDialog open={open} onClose={() => setOpen(false)} card={{id, title, description}} />
    </>
  );
}