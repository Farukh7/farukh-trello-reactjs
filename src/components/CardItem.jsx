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

      // <Dialog
      //   open={open}
      //   onClose={() => setOpen(false)}
      //   maxWidth="md"
      //   fullWidth
      //   PaperProps={{
      //     sx: {
      //       background: "#1f2328",
      //       color: "white",
      //       borderRadius: "12px",
      //     },
      //   }}
      // >
      //   <DialogContent>
      //     {/* HEADER */}
      //     <div className="flex items-center gap-3 mb-4">
      //       <span className="w-4 h-4 rounded-full border border-white/60" />
      //       <input
      //         value={title}
      //         onChange={(e) => setTitle(e.target.value)}
      //         onBlur={saveTitle}
      //         className="bg-transparent text-xl font-semibold outline-none w-full"
      //       />
      //     </div>

      //     {/* ACTION BUTTONS */}
      //     <div className="flex gap-2 flex-wrap mb-6">
      //       {["Add", "Labels", "Dates", "Checklist", "Members"].map((item) => (
      //         <button
      //           key={item}
      //           className="px-3 py-1 text-sm rounded bg-white/10 hover:bg-white/20"
      //         >
      //           {item}
      //         </button>
      //       ))}
      //     </div>

      //     {/* DESCRIPTION HEADER */}
      //     <div className="flex justify-between items-center mb-2">
      //       <div className="flex items-center gap-2 opacity-90">
      //         <FiAlignLeft />
      //         <Typography variant="subtitle2">Description</Typography>
      //       </div>

      //       {!editingDesc && (
      //         <button
      //           onClick={startEditDescription}
      //           className="px-3 py-1 text-sm rounded bg-white/10 hover:bg-white/20"
      //         >
      //           Edit
      //         </button>
      //       )}
      //     </div>

      //     {/* DESCRIPTION CONTENT */}
      //     {!editingDesc ? (
      //       <div className="text-sm text-white/80 px-1">
      //         {description || "Add a more detailed description..."}
      //       </div>
      //     ) : (
      //       <>
      //         <textarea
      //           autoFocus
      //           value={tempDesc}
      //           onChange={(e) => setTempDesc(e.target.value)}
      //           className="w-full min-h-30 p-3 rounded bg-black/50 text-white outline-none"
      //         />

      //         <div className="flex gap-2 mt-2">
      //           <button
      //             onClick={saveDescription}
      //             className="bg-blue-600 px-4 py-1 rounded text-sm"
      //           >
      //             Save
      //           </button>
      //           <button
      //             onClick={() => setEditingDesc(false)}
      //             className="text-white/70"
      //           >
      //             Cancel
      //           </button>
      //         </div>
      //       </>
      //     )}
      //   </DialogContent>
      // </Dialog>