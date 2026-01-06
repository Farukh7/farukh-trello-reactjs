const API_KEY = import.meta.env.VITE_TRELLO_KEY
const TOKEN = import.meta.env.VITE_TRELLO_TOKEN
const URL = import.meta.env.VITE_TRELLO_BASE_URL

const fetchBoardsURL = () => {
  return `${URL}/members/me/boards?key=${API_KEY}&token=${TOKEN}`
}

const createBoardURL = (boardName) => {
  return `${URL}/boards/?name=${boardName.name}&key=${API_KEY}&token=${TOKEN}`
}

export { fetchBoardsURL , createBoardURL}
