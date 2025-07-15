import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-zinc-800/90 backdrop-blur-sm border-b border-zinc-700 flex justify-between items-center text-white p-4 sticky top-0 z-50">
      <div className="flex items-center space-x-2">
        <NavLink
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent hover:from-emerald-300 hover:to-blue-300 transition-all"
        >
          Blowtype
        </NavLink>
      </div>

      <div className="flex items-center space-x-6">
        <nav>
          <ul className="flex items-center space-x-6">
            <li>
              <button className="text-gray-300 hover:text-white transition-colors">
                Settings
              </button>
            </li>
            <li>
              <button className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg transition-colors font-medium">
                Profile
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
