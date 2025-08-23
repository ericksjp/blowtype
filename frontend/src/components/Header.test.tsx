import {describe, expect, test} from "vitest";
import {screen, render} from "@testing-library/react"
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";

describe("<Header/>", ()=>{

    test("Renderiza o nome da aplicação e verifica comportamento ao clicar", ()=>{

        render(
            <MemoryRouter>
                <Header/>
            </MemoryRouter>
        );

        const link = screen.getByRole("link", {name: /Blowtype/i});
        expect(link).toBeInTheDocument();
        expect(link.getAttribute("href")).toBe("/");

    });

    test("Renderiza o button 'Sign In' ", ()=>{
        
        render(
            <MemoryRouter>
                <Header/>
            </MemoryRouter>
        );

         const buttonSignIn = screen.getByRole('link', {name: /Sign in/i})
         expect(buttonSignIn).toBeInTheDocument();
         expect(buttonSignIn.getAttribute("href")).toBe("/auth/login");
    })

})