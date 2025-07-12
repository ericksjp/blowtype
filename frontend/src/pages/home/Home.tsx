import Header from "../../components/Header";
import BookList from "../../components/BookList";

export default function Home() {
    return (
        <>
            <Header />
            <main className="max-w-[1440px] mx-auto flex flex-col">
                <h1 className="text-white text-5xl my-32 text-center">
                    Practice your typing with Blowtype
                </h1>

                <BookList />
            </main>
        </>
    );
}
