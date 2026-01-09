import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <div className="border-b border-gray-300 h-12 flex justify-between items-center px-10">
      <img src={logo} alt="logo" className="h-5 w-5" />
      <h2 className="font-semibold">Trello</h2>
      <div></div>
    </div>
  );
};

export default Navbar;
