import { useEffect, useState } from "react";
import { Card, Typography, CircularProgress } from "@mui/material";
import CardItem from "./CardItem";
import { fetchCardsURL, addCardURL } from "../API/lists";
import axios from "axios";

export default function ListColumn({ id, title }) {
  const [cards, setCards] = useState([]);
  const [adding, setAdding] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [addingCard, setAddingCard] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const endPoint = fetchCardsURL(id);
        const res = await axios.get(endPoint);
        setCards(res.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, [id]);

  const addCard = async () => {
    if (!text.trim()) return;
    setAddingCard(true);
    try {
      const url = addCardURL({ listId: id, cardName: text });
      const res = await axios.post(url);
      setCards([...cards, res.data]);
      setText("");
      setAdding(false);
    } catch (error) {
      console.error("Error adding card:", error);
    } finally {
      setAddingCard(false);
    }
  };

  return (
    <Card
      sx={{
        width: 272,
        backdropFilter: "blur(12px)",
        background: "rgba(0,0,0,0.55)",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        maxHeight: "100%",
      }}
    >
      {/* LIST HEADER */}
      <div className="px-3 py-2 flex justify-between items-center bg-black/20 rounded-t-xl">
        <Typography fontWeight={600} noWrap>
          {title}
        </Typography>
        <span className="opacity-70 cursor-pointer">⋯</span>
      </div>

      {/* CARDS */}
      <div className="px-2 py-2 flex-1 overflow-y-auto space-y-2 custom-scrollbar">
        {loading ? (
          <div className="flex justify-center py-4">
            <CircularProgress size={24} sx={{ color: "white" }} />
          </div>
        ) : (
          cards.map((card, index) => (
            <CardItem
              key={card.id || index}
              id={card.id}
              title={card.name}
            />
          ))
        )}
      </div>

      {/* ADD CARD */}
      <div className="px-3 py-2 rounded-b-xl">
        {!adding ? (
          <button
            onClick={() => setAdding(true)}
            className="text-sm opacity-80 hover:opacity-100 flex items-center gap-1 w-full text-left"
          >
            <span>+</span> Add a card
          </button>
        ) : (
          <>
            <textarea
              autoFocus
              value={text}
              disabled={addingCard}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter a title or paste a link"
              className="w-full p-2 rounded bg-black/60 text-white outline-none text-sm resize-none"
              rows={3}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  addCard();
                }
              }}
            />
            <div className="flex gap-2 mt-2 items-center">
              <button
                onClick={addCard}
                disabled={addingCard}
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded text-sm text-white font-medium min-w-20 flex justify-center items-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addingCard ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  "Add card"
                )}
              </button>
              <button
                onClick={() => setAdding(false)}
                disabled={addingCard}
                className="text-white/70 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
