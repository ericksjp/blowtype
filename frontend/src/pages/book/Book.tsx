import { Link, NavLink } from 'react-router';
import imgBook from "../../assets/images/domCasmurro.jpeg";

export default function Book() {

    return (
        <main>
            <div className='text-white mt-3'>
                <span>
                    <NavLink to="#"
                        className={({ isActive }) =>
                            isActive ? 'pl-9 0 hover:text-emerald-600 font-base' : 'text-gray-300'
                        }
                    >Books</NavLink>
                </span>
                <span> / Chapters</span>
            </div>
            <section className='flex justify-center items-center mt-10 text-white'>
                <div className="flex text-white p-4 gap-5 min-w-[820px]">
                    <img
                        src={imgBook}
                        alt="Book"
                        className="w-40 h-55 object-cover rounded"
                    />
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white">George Orwell</h2>
                        <p className="text-xl text-gray-300 mb-2">1984</p>
                        <div className="flex justify-between items-center text-sm text-gray-300 mb-2 mt-7">
                            <div className="flex flex-col ml-60 text-[16px]  text-neutral-400">
                                <span>– WPM</span>
                                <span>– % ACC</span>
                            </div>

                            <div className="w-px h-8 bg-gray-500 mx-4"></div>

                            <div className="flex flex-col items-end text-[16px] text-neutral-400">
                                <span>0 / 24 Chapters</span>
                                <span>0 / 346 Pages</span>
                            </div>
                        </div>
                        <div className="relative w-full h-2 bg-teal-600 rounded mt-5">
                            <div
                                className="absolute top-0 left-0 h-2 bg-red-900 rounded"
                                style={{ width: `0%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-right mt-1 text-gray-300 font-semibold">
                            0 % Complete
                        </p>
                    </div>
                </div>

            </section>
            <section className='flex justify-center items-center mt-8 text-white'>
                <div>
                <Link to="#" className='bg-sky-900 w-197 flex justify-between pt-1.5 pb-1.5
                rounded mb-4 hover:bg-sky-700'>
                    <div className='pl-8'>Chapter 1</div>
                    <div className='pr-8'>18 Pages</div>
                </Link>
                <Link to="#" className='bg-sky-900 w-197 flex justify-between pt-1.5 pb-1.5
                rounded mb-4 hover:bg-sky-700 '>
                    <div className='pl-8'>Chapter 2</div>
                    <div className='pr-8'>19 Pages</div>
                </Link> 
                <Link to="#" className='bg-sky-900 w-197 flex justify-between pt-1.5 pb-1.5
                rounded mb-4 hover:bg-sky-700 '>
                    <div className='pl-8'>Chapter 3</div>
                    <div className='pr-8'>18 Pages</div>
                </Link> 
                <Link to="#" className='bg-sky-900 w-197 flex justify-between pt-1.5 pb-1.5
                rounded mb-4 hover:bg-sky-700 '>
                    <div className='pl-8'>Chapter 4</div>
                    <div className='pr-8'>18 Pages</div>
                </Link> 
                <Link to="#" className='bg-sky-900 w-197 flex justify-between pt-1.5 pb-1.5
                rounded mb-4 hover:bg-sky-700 '>
                    <div className='pl-8'>Chapter 5</div>
                    <div className='pr-8'>18 Pages</div>
                </Link> 
                <Link to="#" className='bg-sky-900 w-197 flex justify-between pt-1.5 pb-1.5
                rounded mb-4 hover:bg-sky-700 '>
                    <div className='pl-8'>Chapter 6</div>
                    <div className='pr-8'>18 Pages</div>
                </Link>             
            </div>
            </section>
        </main>
    )
}
