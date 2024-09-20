import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../HomePage";
import { Ctx } from "../../DataContext";
import { homePageCard } from "../../utils/homePageCard"; // Importiamo le card da verificare

beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(console, "warn").mockImplementation(() => {});
});

const mockContextValue = {
    loggedUserInfo: {
        userId: 'mario.rossi@pagopa.com',
        name: 'Mario',
        surname: 'Rossi',
        createdAt: '2024-05-27',
        lastUpdatedAt: '2024-05-27',
        profiles: [
            {
                description: "Gestione flussi in lettura",
                profileId: 1,
                createdAt: "2024-05-27",
                lastUpdatedAt: "2024-05-27"
            },
            {
                description: "Gestione flussi in scrittura",
                profileId: 2,
                createdAt: "2024-05-27",
                lastUpdatedAt: "2024-05-27"
            },
            {
                description: "Rilascio BPMN",
                profileId: 3,
                createdAt: "2024-05-27",
                lastUpdatedAt: "2024-05-27"
            },
            {
                description: "Emulator",
                profileId: 4,
                createdAt: "2024-05-27",
                lastUpdatedAt: "2024-05-27"
            },
            {
                description: "Gestione utenti",
                profileId: 5,
                createdAt: "2024-05-27",
                lastUpdatedAt: "2024-05-27"
            }
        ]
    },
    abortController: new AbortController()
};

describe("HomePage test", () => {
    test("First render", () => {
        render(
            <Ctx.Provider value={mockContextValue}>
                <BrowserRouter>
                    <HomePage />
                </BrowserRouter>
            </Ctx.Provider>
        );
        const titleElement = screen.getByText("Console management");
        expect(titleElement).toBeInTheDocument();
        const subTitleElement = screen.getByText("Console per la gestione delle risorse");
        expect(subTitleElement).toBeInTheDocument();
    });

    test("Checks if the correct cards are visible based on user profiles", () => {
        render(
            <Ctx.Provider value={mockContextValue}>
                <BrowserRouter>
                    <HomePage />
                </BrowserRouter>
            </Ctx.Provider>
        );
    
        const visibleCards = homePageCard.filter(el => el.id !== "home" && (
            ["process", "static", "workflow", "users"]
        ).includes(el.id));
    
        visibleCards.forEach(card => {
            const cardTitle = screen.getByText(card.title);
            expect(cardTitle).toBeInTheDocument();
        });
    
        const notExpectedCards = ["transactions", "banks"];
        notExpectedCards.forEach(cardId => {
            const card = homePageCard.find(el => el.id === cardId);
            if (card) {
                const cardTitle = screen.queryByText(card.title);
                expect(cardTitle).not.toBeInTheDocument();
            }
        });
    });
    
});
