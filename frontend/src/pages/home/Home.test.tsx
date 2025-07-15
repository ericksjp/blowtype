import {describe, expect, test, vi} from "vitest";
import {screen, render} from "@testing-library/react";
import Home from "./Home";

vi.mock('../../components/BookList', () => ({
    default: () => <div data-testid="book-list">Book List</div>,
}))

vi.mock('../../components/Header', () => ({
    default: () => <header>Mock Header</header>
}))

describe("<Home/>", ()=>{
    test("Renderiza titulo e descrição", ()=>{
        render(<Home/>);
        expect(screen.getByText("Blowtype")).toBeInTheDocument();
        expect(screen.getByText(/Master your typing skills with classic literature/i));
    });

    test("Renderiza recursos detalhados", ()=>{

        render(<Home/>);
        expect(screen.getByText("Track WPM & Accuracy")).toBeInTheDocument();
        expect(screen.getByText("Progressive Difficulty")).toBeInTheDocument();
        expect(screen.getByText("Classic Literature")).toBeInTheDocument();
    });

    test("Renderiza componente BookList", ()=>{

        render(<Home/>);
        expect(screen.getByTestId("book-list")).toBeInTheDocument();
    });

    test("Renderiza componente Header", ()=>{

        render(<Home/>);
        expect(screen.getByText("Mock Header")).toBeInTheDocument();
    });
})