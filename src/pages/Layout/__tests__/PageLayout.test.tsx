import { render, screen } from "@testing-library/react";
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import PageLayout from "../PageLayout";
import { Ctx } from "../../../DataContext";
import { themeApp } from "../../../assets/jss/themeApp";
import { ThemeProvider } from "@mui/material";

const originalFetch = global.fetch;

beforeEach(() => {
	jest.spyOn(console, "error").mockImplementation(() => { });
	jest.spyOn(console, "warn").mockImplementation(() => { });
});

afterEach(() => {
    global.fetch = originalFetch;
})

const userEmail = jest.fn();

const mockContextValueLoadingFalseNoToken = {
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
    loading: false,
	userEmail
};

const setUserEmail = jest.fn();

const mockContextValueLoadingTrueNoToken = {
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
    loading: true,
	setUserEmail
};

describe("PageLayout test", () => {

	test("Test render PageLayout component with loading false and no userEmail nor token", () => {
		
		render(
			<Ctx.Provider value={ mockContextValueLoadingFalseNoToken }>
				<BrowserRouter>
					<ThemeProvider theme={themeApp}>
						<PageLayout children={<React.Fragment />} />
					</ThemeProvider>
				</BrowserRouter>
			</Ctx.Provider>
		);
	});

	test("Test render PageLayout component with loading true and no userEmail with token", () => {
		const userEmail = { email: undefined };
		
		sessionStorage.setItem("jwt_console", "token");
		global.fetch = jest.fn().mockResolvedValue({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: { email: "testEmail" },
            }),
        });
		render(
			<Ctx.Provider value={ mockContextValueLoadingTrueNoToken }>
				<BrowserRouter>
					<ThemeProvider theme={themeApp}>
						<PageLayout children={<React.Fragment />} />
					</ThemeProvider>
				</BrowserRouter>
			</Ctx.Provider>
		);
		expect(global.fetch).toHaveBeenCalled();
	});
});
