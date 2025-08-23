import {fireEvent, render, screen} from "@testing-library/react";
import {describe, test, expect, beforeEach} from "vitest";
import {MemoryRouter} from "react-router-dom";
import { useTypingStore } from "../../store/typingStore";
import Book from "./Book";
import { useBookStore } from "../../store/bookStore";

describe("<Book/>", ()=>{
    beforeEach(()=>{

        useTypingStore.setState({
            selectedBook: null,
            selectedChapter: null,
        })
    });


    test("Deve exibir mensagem de erro caso não tem livros disponíveis", ()=>{

        render(
            <MemoryRouter>
                <Book/>
            </MemoryRouter>
        );

        expect(screen.getByText("Book not found")).toBeInTheDocument();
        
       const linkVoltar = screen.getByText("Go back to book selection");
       expect(linkVoltar).toBeInTheDocument();
       expect(linkVoltar.getAttribute("href")).toBe("/");

    });
    test("Deve exibir 'Loading book...' enquanto estive carregando", ()=>{

        useBookStore.setState({loading: true});

        render(
            <MemoryRouter>
                <Book/>
            </MemoryRouter>
        );
        expect(screen.getByText('Loading book...')).toBeInTheDocument();

    })

    test("Deve voltar para pagina 'Home' quando clicar no link 'Blowtype'", ()=>{

        render(
            <MemoryRouter>
                <Book/>
            </MemoryRouter>
        );

        const linkHome = screen.getByText(/Blowtype/i);

        fireEvent.click(linkHome);

        expect(screen.getByText(/Blowtype/i)).toBeInTheDocument();
    })


});
