import {screen, render} from "@testing-library/react";
import {describe, test, expect} from "vitest";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";


describe("<Login/>", ()=>{

    test("Deve renderizar corretamente os elementos da página de Login", ()=>{

        render(
            <MemoryRouter>
                <Login/>
            </MemoryRouter>
        );

        expect(screen.getByPlaceholderText(/Enter your e-mail/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter the password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /sign in/i})).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument();

    });
    test("Deve redireciona para a página de Register ao clicar em 'Sign up'", ()=>{
        
        render(
            <MemoryRouter>
                <Login/>
            </MemoryRouter>
        )

        const signUpLink = screen.getByRole('link', { name: /sign up/i });
        expect(signUpLink.getAttribute("href")).toBe('/auth/register');
    })

})
