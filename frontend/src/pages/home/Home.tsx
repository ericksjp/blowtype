import Header from "../../components/Header";
import BookList from "../../components/BookList";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-[1440px] mx-auto flex flex-col px-4">
        <div className="text-center my-16">
          <h1 className="text-white text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
            Blowtype
          </h1>
          <p className="text-gray-300 text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
            Master your typing skills with classic literature.
            <span className="text-emerald-400 font-semibold">
              {" "}
              Practice, improve, and track your progress
            </span>{" "}
            as you type through timeless stories.
          </p>
          <div className="mt-8 flex justify-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
              <span>Track WPM & Accuracy</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span>Progressive Difficulty</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
              <span>Classic Literature</span>
            </div>
          </div>
        </div>

        <BookList />
      </main>
    </div>
  );
}
