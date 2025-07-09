import {NavLink} from "react-router";

export default function Header() {
  return (
    <header className='bg-zinc-700 flex justify-between text-white p-3'>
        <div>
            <NavLink to="/"
            className={({ isActive }) =>
              isActive ?'font-bold pl-9 0 hover:text-cyan-600' : 'text-gray-300'
            }
            >BlowType</NavLink>
        </div>
        <nav>
            <ul className='flex'>
                <li>
                    <NavLink to="#"
                    className={({ isActive }) => 
                        isActive ? 'pr-9  hover:text-gray-300' : 'text-gray-300'
                    }
                    >Shop</NavLink>
                </li>
                <li>
                    <NavLink to="#"
                    className={({ isActive }) =>
                    isActive ?'pr-9  hover:text-gray-300' : 'text-gray-300'
                    }
                    >Import</NavLink>
                </li>
                <li>
                    <NavLink to="#"
                    className={({ isActive }) =>
                    isActive ?'pr-9  hover:text-gray-200' : 'text-gray-300'
                    }
                    >Sign In</NavLink>
                </li>
            </ul>
        </nav>
    </header>
  )
}
