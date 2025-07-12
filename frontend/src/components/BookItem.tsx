import { Link } from "react-router-dom";

type BookItemProps = {
    cover: string;
    title: string;
    author: string;
    qtdPages: number;
};

export default function BookItem({
    cover,
    title,
    author,
    qtdPages,
}: BookItemProps) {
    return (
        <Link to="/book">
            <div className="flex justify-center">
                <img src={cover} className="h-32 rounded-l-md" />
                <div className="relative bg-zinc-700 hover:bg-zinc-800 transition w-64 p-2 rounded-r-md">
                    <div className="flex flex-col">
                        <span className="text-white text-xl font-medium">
                            {title}
                        </span>
                        <span className="text-zinc-400 text-sm font-light">
                            {author}
                        </span>
                    </div>
                    <div className="absolute bottom-2  right-2">
                        <span className="text-zinc-400 text-sm font-medium">
                            {qtdPages} <span>Pages</span>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
