import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UsersPage from '../UsersPage';
import { Ctx } from '../../../DataContext';

const clearStorage = jest.fn();

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
    abortController: new AbortController(),
    clearStorage
};


describe('UsersPage test', () => {
    const renderComponent = () => {
        return render(
            <Ctx.Provider value={ mockContextValue }>
                <BrowserRouter>
                    <UsersPage />
                </BrowserRouter>
            </Ctx.Provider>
        );
    };

    test('renders UsersPage and checks initial state', async () => {
        renderComponent();

        // Verify that the breadcrumb is rendered
        expect(screen.getByText("Utenti e autorizzazioni")).toBeInTheDocument();

        // Verify that ActionAlert is initially not visible
        expect(screen.queryByText("Update primo utente")).toBeNull();
    });
});
