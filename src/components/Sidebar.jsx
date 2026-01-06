import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import HomeIcon from "@mui/icons-material/Home";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#161A1D] p-4 space-y-6">
      <div className="space-y-2">
        <Item icon={<DashboardIcon />} label="Boards" active />
        <Item icon={<ViewQuiltIcon />} label="Templates" />
        <Item icon={<HomeIcon />} label="Home" />
      </div>

      <hr className="border-gray-700" />

      <div>
        <p className="text-xs text-gray-400 mb-3">WORKSPACES</p>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-green-600 rounded text-center font-bold"></div>
          <span>Trello Workspace</span>
        </div>
      </div>
    </aside>
  );
}

function Item({ icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer ${
        active ? "bg-blue-600" : "hover:bg-gray-700"
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}
