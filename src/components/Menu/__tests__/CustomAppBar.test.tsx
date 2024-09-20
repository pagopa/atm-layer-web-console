import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import React from "react";
import CustomAppBar from "../CustomAppBar";
import { Ctx } from "../../../DataContext";
import { homePageCard } from "../../../utils/homePageCard";
import { BANCHE, LETTURA, SCRITTURA, UTENTI } from "../../../commons/constants";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const mockTheme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        error: {
            main: '#f44336',
        },
        background: {
            default: '#fafafa',
        },
        text: {
            primary: '#000000',
            secondary: '#ffffff',
        },
        europeanUnion: {
            main: '#003399',
        },
        normal: {
            main: '#00ff00',
            light: '#00ff01',
            dark: '#00ff02',
            contrastText: '#00ff03',
        },
        negative: {
            main: '#ff0000',
        },
        indigo: {
            main: '#4b0082',
        },
        primaryAction: {
        },
    },
});

const mockContextValue = {
    loggedUserInfo: {
        userId: 'test.user@pagopa.com',
        name: 'Test',
        surname: 'User',
        createdAt: '2024-05-27',
        lastUpdatedAt: '2024-05-27',
        profiles: [
            { profileId: LETTURA },
            { profileId: SCRITTURA },
            { profileId: UTENTI }
        ]
    },
    abortController : new AbortController()
};

describe("CustomAppBar", () => {


    beforeEach(() => {
        window.innerWidth = 500;
        window.dispatchEvent(new Event('resize'));
    });

    test("renders menu buttons based on user profile", () => {
        render(
            <ThemeProvider theme={mockTheme}> 
                <Ctx.Provider value={mockContextValue}>
                    <BrowserRouter>
                        <CustomAppBar />
                    </BrowserRouter>
                </Ctx.Provider>
            </ThemeProvider>
        );

        homePageCard
            .filter(el => el.id && ["home", "process", "users"].includes(el.id))
            .forEach(el => {
                expect(screen.getByText(el.title)).toBeInTheDocument();
            });

        const banksCard = homePageCard.find(el => el.id === "banks");
        if (banksCard) {
            expect(screen.queryByText(banksCard.title)).not.toBeInTheDocument();
        }
    });

    test("opens and closes the drawer when clicking the menu icon", () => {
        render(
            <ThemeProvider theme={mockTheme}> 
                <Ctx.Provider value={mockContextValue}>
                    <BrowserRouter>
                        <CustomAppBar />
                    </BrowserRouter>
                </Ctx.Provider>
            </ThemeProvider>
        );

        const menuButton = screen.getByRole('button', { name: /menu/i });
        fireEvent.click(menuButton);

        expect(screen.getByRole('presentation')).toBeInTheDocument();

        const closeButton = screen.getByRole('button', { name: "close" });
        fireEvent.click(closeButton);

        expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
    });

    test("opens and closes the drawer when clicking the menu icon", () => {
        render(
            <ThemeProvider theme={mockTheme}> 
                <Ctx.Provider value={mockContextValue}>
                    <BrowserRouter>
                        <CustomAppBar />
                    </BrowserRouter>
                </Ctx.Provider>
            </ThemeProvider>
        );
    
        const menuButton = screen.getByRole('button', { name: /menu/i });
        fireEvent.click(menuButton);
    
        expect(screen.getByRole('presentation')).toBeInTheDocument();
    
        const closeButton = screen.getByRole('button', { name: /close/i });
        fireEvent.click(closeButton);
    
        expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
    });
    
    

    // test("renders dark font buttons in the drawer", () => {
    //     render(
    //         <ThemeProvider theme={mockTheme}>  {/* Usa il tema mockato */}
    //             <Ctx.Provider value={mockContextValue}>
    //                 <BrowserRouter>
    //                     <CustomAppBar />
    //                 </BrowserRouter>
    //             </Ctx.Provider>
    //         </ThemeProvider>
    //     );

    //     // Simula il click sull'icona del menu per aprire il drawer
    //     const menuButton = screen.getByRole('button', { name: /menu/i });
    //     fireEvent.click(menuButton);

    //     // Verifica che i pulsanti nel drawer abbiano il font scuro
    //     homePageCard
    //         .filter(el => el.id && ["home", "process", "users"].includes(el.id)) // "home", "process", "users" corrispondono ai profili LETTURA, SCRITTURA e UTENTI
    //         .forEach(el => {
    //             const button = screen.getByText(el.title);
    //             expect(button).toBeInTheDocument();
    //             // Verifica che il pulsante abbia la classe o stile che indica il font scuro (puoi adattarlo al tuo CSS)
    //         });
    // });
});
