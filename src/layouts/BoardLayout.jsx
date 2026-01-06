import { Outlet } from "react-router-dom";

export default function BoardLayout() {
  return (
    <div className="h-screen w-screen overflow-hidden text-white">
      <Outlet />
    </div>
  );
}
