const API_KEY = import.meta.env.VITE_TRELLO_KEY
const TOKEN = import.meta.env.VITE_TRELLO_TOKEN
const URL = import.meta.env.VITE_TRELLO_BASE_URL


//Checklists APIs
const fetchCheckListURL = (cardId) => {
  return `${URL}/cards/${cardId}/checklists?key=${API_KEY}&token=${TOKEN}`
}

const deleteCheckListURL = ({ cardId, listId }) => {
  return `${URL}/cards/${cardId}/checklists/${listId}?key=${API_KEY}&token=${TOKEN}`
}

const addCheckListURL = ({ cardId, checkListName }) => {
  return `${URL}/cards/${cardId}/checklists?name=${checkListName}&key=${API_KEY}&token=${TOKEN}`
}


//CheckItems APIs
const getCheckItemsURL = (checkListId) => {
  return `${URL}/checklists/${checkListId}/checkItems?key=${API_KEY}&token=${TOKEN}`
}

const addCheckItemURL = ({ checkListId, itemName }) => {
  return `${URL}/checklists/${checkListId}/checkItems?name=${itemName}&key=${API_KEY}&token=${TOKEN}`
}

const deleteCheckItemURL = ({ checkListId, itemId }) => {
  return `${URL}/checklists/${checkListId}/checkItems/${itemId}?key=${API_KEY}&token=${TOKEN}`
}

const updateCheckItemStateURL = ({ cardId, itemId, state }) => {
  return `${URL}/cards/${cardId}/checkItem/${itemId}?key=${API_KEY}&token=${TOKEN}&state=${state}`
}

export {
  fetchCheckListURL,
  deleteCheckListURL,
  addCheckListURL,
  getCheckItemsURL,
  addCheckItemURL,
  deleteCheckItemURL,
  updateCheckItemStateURL,
}
