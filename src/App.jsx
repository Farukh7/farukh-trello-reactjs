import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import BoardLayout from "./layouts/BoardLayout";
import HomePage from "./pages/HomePage";
import BoardPage from "./pages/BoardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: "/board/:id",
    element: <BoardLayout />,
    children: [{ index: true, element: <BoardPage /> }],
  },

]);

export default function App() {
  return <RouterProvider router={router} />;
}
