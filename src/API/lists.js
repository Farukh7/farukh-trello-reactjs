const API_KEY = import.meta.env.VITE_TRELLO_KEY;
const TOKEN = import.meta.env.VITE_TRELLO_TOKEN;
const URL = import.meta.env.VITE_TRELLO_BASE_URL;

// List API URLs
const fetchListsURL = (boardID) => {
  return `${URL}/boards/${boardID}/lists?key=${API_KEY}&token=${TOKEN}`;
};

const createListURL = ({ boardID, listName }) => {
  return `${URL}/lists?name=${listName}&idBoard=${boardID}&key=${API_KEY}&token=${TOKEN}`;
};

const deleteListURL = (listId) => {
  return `${URL}/lists/${listId}/closed?key=${API_KEY}&token=${TOKEN}`;
};

//List Card API URLs
const fetchCardsURL = (listId) => {
  return `${URL}/lists/${listId}/cards?key=${API_KEY}&token=${TOKEN}`;
};

const addCardURL = ({ listId, cardName }) => {
  return `${URL}/cards?idList=${listId}&name=${cardName}&key=${API_KEY}&token=${TOKEN}`;
};

const deleteCardURL = (cardId) => {
  return `${URL}/cards/${cardId}?key=${API_KEY}&token=${TOKEN}`;
};

const markListComplete = (cardId) => {
  return `${URL}/cards/${cardId}?key=${API_KEY}&token=${TOKEN}`;
};

export {
  fetchListsURL,
  createListURL,
  deleteListURL,
  fetchCardsURL,
  addCardURL,
  deleteCardURL,
  markListComplete,
};
