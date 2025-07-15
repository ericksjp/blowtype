import {describe, expect, test} from "vitest";
import {screen, render} from "@testing-library/react"
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";

describe("<Header/>", ()=>{

    test("Renderiza o nome da aplicação e verifica comportamento ao clicar", ()=>{

        render(<Header/>, {wrapper: MemoryRouter});

        const link = screen.getByRole("link", {name: "Blowtype"});
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/");

    });

    test("Renderiza os buttões Settings e Profile", ()=>{
        
        render(<Header/>,{wrapper: MemoryRouter});

        expect(screen.getByRole("button", {name: "Settings"})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Profile"})).toBeInTheDocument();
    })

})