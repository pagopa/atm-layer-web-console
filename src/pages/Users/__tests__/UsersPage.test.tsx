import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UsersPage from '../UsersPage';
import { Ctx } from '../../../DataContext';

const clearStorage = jest.fn();

const mockContextValueWithValues = {
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
    clearStorage,
    profilesAvailable: [
        {
            description: "uno",
            profileId: 1,
            createdAt: "2024-05-27",
            lastUpdatedAt: "2024-05-27",
        },
        {
            description: "due",
            profileId: 1,
            createdAt: "2024-05-27",
            lastUpdatedAt: "2024-05-27",
        },
    ]
};

const mockContextValueWithoutValues = {
    loggedUserInfo: {
        userId: 'mario.rossi@pagopa.com',
        name: '',
        surname: '',
        createdAt: '2024-05-27',
        lastUpdatedAt: '2024-05-27',
        profiles: [
            {
                description: "Gestione utenti",
                profileId: 5,
                createdAt: "2024-05-27",
                lastUpdatedAt: "2024-05-27"
            }
        ]
    },
    abortController: new AbortController(),
    clearStorage,
    profilesAvailable: [
        {
            description: "uno",
            profileId: 1,
            createdAt: "2024-05-27",
            lastUpdatedAt: "2024-05-27",
        },
        {
            description: "due",
            profileId: 1,
            createdAt: "2024-05-27",
            lastUpdatedAt: "2024-05-27",
        },
    ]
};



describe('UsersPage test', () => {

    test('renders UsersPage and checks initial state', async () => {
        render(
            <Ctx.Provider value={ mockContextValueWithValues }>
                <BrowserRouter>
                    <UsersPage />
                </BrowserRouter>
            </Ctx.Provider>
        );

        expect(screen.getByText("Utenti e autorizzazioni")).toBeInTheDocument();

        expect(screen.queryByText("Update primo utente")).toBeNull();

        // fireEvent.click(screen.getByText("Crea Nuovo"));
        // await waitFor(() => {
        //     expect(screen.getByText("Creazione nuovo utente")).toBeInTheDocument();
        // });

        // fireEvent.click(screen.getByText("Annulla"));
    });

    // test('renders UsersPage and open first user modal', async () => {
    //     render(
    //         <Ctx.Provider value={ mockContextValueWithoutValues }>
    //             <BrowserRouter>
    //                 <UsersPage />
    //             </BrowserRouter>
    //         </Ctx.Provider>
    //     );

    //     expect(screen.getByText("Utenti e autorizzazioni")).toBeInTheDocument();

    //     expect(screen.getByText("Sei il primo utente che accede alla console: completa il tuo profilo con le informazioni anagrafiche ed eventuali ruoli aggiuntivi")).toBeInTheDocument();

    // });
});
