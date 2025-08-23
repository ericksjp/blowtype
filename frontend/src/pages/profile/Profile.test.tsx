import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { MemoryRouter } from 'react-router-dom';
import Profile from "./Profile";
import { useAuthStore } from "../../store/authStore";


vi.mock("../../components/Header", () => ({
    default: () => <div data-testid="header">Header Mock</div>,
}));

vi.mock("../../store/authStore", () => ({
    useAuthStore: vi.fn()
}))

vi.mock("../../services/api", () => ({
    typingAPI: {
        getStats: vi.fn()
    }
}))

describe("<Profile/>", () => {
    test("Não deve renderiza nada se usuário não estiver autenticado", () => {

        (useAuthStore as any).mockReturnValue({
            user: null,
            isAuthenticated: false,
        });

        render(
            <MemoryRouter>
                <Profile />
            </MemoryRouter>
        );

        expect(screen.queryByText(/Profile/i)).not.toBeInTheDocument();
    });

    test("Deve exibir mensagem quando não houver estatísticas", async () => {

        (useAuthStore as any).mockReturnValue({
            user: { username: "Joao", email: "joao@gmail.com" },
            isAuthenticated: true,
        });

        render(
            <MemoryRouter>
                <Profile />
            </MemoryRouter>
        );

        expect(await screen.findByText(/No typing statistics available yet/i)).toBeInTheDocument();
        expect(screen.getByText(/Start typing to see your progress!/i)).toBeInTheDocument();
    });

})