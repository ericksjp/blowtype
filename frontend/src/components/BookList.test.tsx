import {describe, expect, test, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import BookList from "./BookList";

vi.mock("./BookItem.tsx", ()=>({
    default: ()=> <div data-testid="book-item">Book Item</div>,
}));

describe("<BookList/>", ()=>{
    test("Renderiza 'Available Books' e a instrução de escolha do livro", ()=>{

        render(<BookList/>);
        expect(screen.getByText("Available Books")).toBeInTheDocument();
        expect(screen.getByText("Choose a book to start practicing your typing skills")).toBeInTheDocument();
    });

    test("Renderiza componente BookItem", ()=>{

        render(<BookList/>);
        const items = screen.getAllByTestId("book-item");
        expect(items.length).toBeGreaterThan(0);
    })
})