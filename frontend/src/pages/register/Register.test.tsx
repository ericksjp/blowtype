import {fireEvent, render, screen} from "@testing-library/react";
import {describe, test, expect, vi, beforeEach} from "vitest";
import {MemoryRouter} from 'react-router-dom';
import Register from "./Register";
import { toast } from "react-toastify";

vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe("<Register/>", ()=>{

    beforeEach(() => {
        vi.clearAllMocks();
    });
    
    test("Deve renderizar corretamente os elementos da página de Cadastro", ()=>{
        render(
            <MemoryRouter>
                <Register/>
            </MemoryRouter>
        );

        expect(screen.getByPlaceholderText(/Enter your username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter your e-mail/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter the password/i)).toBeInTheDocument();

        expect(screen.getByRole('button', {name: /sign up/i})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: /sign in/i})).toBeInTheDocument();

    });

    test("valida inputs e mostra erros corretos", ()=>{
        render(
            <MemoryRouter>
                <Register/>
            </MemoryRouter>

        );

        const emailInput = screen.getByPlaceholderText(/Enter your e-mail/i);
        const passwordInput = screen.getByPlaceholderText(/Enter the password/i);
        const nameInput = screen.getByPlaceholderText(/Enter your username/i);
        const form = screen.getByTestId("register-form");

        // Teste para nome invalido

        fireEvent.change(nameInput, {target: {value: "Jo"}});
        fireEvent.change(emailInput, {target: {value: "joao@gmail.com"}});
        fireEvent.change(passwordInput, {target: {value: "password12345"}});
        fireEvent.submit(form);

        expect(toast.error).toHaveBeenCalledWith("Username must be at least 3 characters long");

        // Teste para email invalido

        fireEvent.change(nameInput, {target: {value: "João"}});
        fireEvent.change(emailInput, {target: {value: "joaogmail.com"}});
        fireEvent.change(passwordInput, {target: {value: "password12345"}});
        fireEvent.submit(form);

        expect(toast.error).toHaveBeenCalledWith("Please enter a valid email address")
        
        // Teste para senha menor que 6 digitos

        fireEvent.change(nameInput, {target: {value: "João"}});
        fireEvent.change(emailInput, {target: {value: "joao@gmail.com"}});
        fireEvent.change(passwordInput, {target: {value: "12345"}});
        fireEvent.submit(form);

        expect(toast.error).toHaveBeenCalledWith("Password must be at least 6 characters long");

    })
})