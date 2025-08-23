import { NavLink } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

export default function Header() {
  const { user, isAuthenticated, logout, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

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
            {" "}
            {isAuthenticated ? (
              <>
                <li>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-400 font-bold"
                        : "text-gray-300 hover:text-white transition-colors"
                    }
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <span className="text-gray-300">
                    Welcome, {user?.username}!
                  </span>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="text-white pt-2 pb-2 pl-3 pr-3 bg-red-600 rounded hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </li>
              </>            ) : (
              <>
                <li>
                  <span className="text-yellow-400 text-sm font-medium bg-yellow-400/10 px-2 py-1 rounded">
                    👤 Guest Mode - Progress not saved
                  </span>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "font-bold text-blue-400"
                        : "text-white pt-2 pb-2 pl-3 pr-3 bg-emerald-400 rounded mr-3 hover:bg-emerald-600 transition-colors"
                    }
                    to="/auth/login"
                  >
                    Sign in
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
