import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1
        onClick={() => navigate("/dashboard")}
        className="text-xl font-semibold cursor-pointer"
      >
        Meeting Action Items
      </h1>

      <div className="flex gap-4 items-center">
        <button
          onClick={() => navigate("/status")}
          className="text-sm text-blue-600"
        >
          Status
        </button>

        <button
          onClick={handleLogout}
          className="text-sm bg-red-600 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
