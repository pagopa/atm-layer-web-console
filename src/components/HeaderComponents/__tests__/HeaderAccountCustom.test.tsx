import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HeaderAccountCustom } from '../HeaderAccountCustom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Ctx } from '../../../DataContext';
import { fetchRequest } from '../../../hook/fetch/fetchRequest';
import ROUTES from '../../../routes';

jest.mock('../../../hook/fetch/fetchRequest', () => ({
  fetchRequest: jest.fn(),
}));

const mockFetchRequest = fetchRequest as jest.Mock;

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockCtx = {
  abortController: new AbortController(),
  loggedUserInfo: {
    userId: 'mario.rossi@pagopa.com',
    name: 'Mario',
    surname: 'Rossi',
    createdAt: '2024-05-27',
    lastUpdatedAt: '2024-05-27',
    profiles: [
      {
        description: 'Gestione flussi in lettura',
        profileId: 1,
        createdAt: '2024-05-27',
        lastUpdatedAt: '2024-05-27',
      },
      {
        description: 'Gestione flussi in scrittura',
        profileId: 2,
        createdAt: '2024-05-27',
        lastUpdatedAt: '2024-05-27',
      },
    ],
  },
  setLoggedUserInfo: jest.fn(),
  setProfilesAvailable: jest.fn(),
};

const mockRootLink = {
  ariaLabel: 'home',
  title: 'Home',
  element: <div>Logo</div>,
};

describe('HeaderAccountCustom', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // test('renders HeaderAccountCustom component with EmulatorButton when not PROD', () => {
  //   process.env.REACT_APP_ENV = 'DEV';

  //   render(
  //     <Router>
  //       <Ctx.Provider value={mockCtx}>
  //         <HeaderAccountCustom rootLink={mockRootLink} loggedUser={true} />
  //       </Ctx.Provider>
  //     </Router>
  //   );

  //   expect(screen.getByText('Logo')).toBeInTheDocument();
  //   expect(screen.getByText('Esci')).toBeInTheDocument();
  //   expect(screen.getByTestId('emulator-button')).toBeInTheDocument();
  // });

  test('does not show EmulatorButton when in PROD environment', () => {
    process.env.REACT_APP_ENV = 'PROD';

    render(
      <Router>
        <Ctx.Provider value={mockCtx}>
          <HeaderAccountCustom rootLink={mockRootLink} loggedUser={true} />
        </Ctx.Provider>
      </Router>
    );

    expect(screen.getByText('Logo')).toBeInTheDocument();
    expect(screen.getByText('Esci')).toBeInTheDocument();
    expect(screen.queryByTestId('emulator-button')).not.toBeInTheDocument();
  });

  test('logout button works', () => {
    const mockOnLogout = jest.fn();

    render(
      <Router>
        <Ctx.Provider value={mockCtx}>
          <HeaderAccountCustom rootLink={mockRootLink} loggedUser={true} onLogout={mockOnLogout} />
        </Ctx.Provider>
      </Router>
    );
    fireEvent.click(screen.getByText('Esci'));
    expect(mockOnLogout).toHaveBeenCalled();
  });

  // Test della funzione getUserInfo

  // test('getUserInfo should set logged user info when response is successful', async () => {
  //   const mockResponse = {
  //     success: true,
  //     valuesObj: {
  //       userId: 'mario.rossi@pagopa.com',
  //       name: 'Mario',
  //       surname: 'Rossi',
  //       profiles: [{ profileId: 1, description: 'Admin' }],
  //     },
  //   };

  //   // Mock fetchRequest per restituire una risposta positiva
  //   mockFetchRequest.mockImplementationOnce(() => async () => mockResponse);

  //   // Simula il contesto
  //   render(
  //     <Router>
  //       <Ctx.Provider value={mockCtx}>
  //         <HeaderAccountCustom rootLink={mockRootLink} loggedUser={true} />
  //       </Ctx.Provider>
  //     </Router>
  //   );

  //   // Chiama la funzione
  //   await mockCtx.setLoggedUserInfo(mockResponse.valuesObj);

  //   // Verifica che setLoggedUserInfo sia stato chiamato con i dati corretti
  //   await waitFor(() =>
  //     expect(mockCtx.setLoggedUserInfo).toHaveBeenCalledWith(mockResponse.valuesObj)
  //   );

  //   // Verifica che i dati siano stati salvati in sessionStorage
  //   expect(sessionStorage.getItem('loggedUserInfo')).toBe(
  //     JSON.stringify(mockResponse.valuesObj)
  //   );

  //   // Assicurati che non ci sia stata nessuna navigazione
  //   expect(mockNavigate).not.toHaveBeenCalled();
  // });

  // test('getUserInfo should navigate to error page when response is unsuccessful', async () => {
  //   const mockErrorResponse = {
  //     success: false,
  //   };

  //   // Mock fetchRequest per restituire una risposta negativa
  //   mockFetchRequest.mockImplementationOnce(() => async () => mockErrorResponse);

  //   // Simula il contesto
  //   render(
  //     <Router>
  //       <Ctx.Provider value={mockCtx}>
  //         <HeaderAccountCustom rootLink={mockRootLink} loggedUser={true} />
  //       </Ctx.Provider>
  //     </Router>
  //   );

  //   // Chiama la funzione
  //   await mockCtx.setLoggedUserInfo(mockErrorResponse);

  //   // Verifica che non sia stata chiamata setLoggedUserInfo
  //   expect(mockCtx.setLoggedUserInfo).not.toHaveBeenCalled();

  //   // Verifica che la navigazione sia stata eseguita verso la pagina di errore
  //   await waitFor(() =>
  //     expect(mockNavigate).toHaveBeenCalledWith(ROUTES.ERROR_PAGE_USERS_DB)
  //   );
  // });

  test('getUserInfo should log an error when fetchRequest throws an error', async () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Mock fetchRequest per lanciare un errore
    mockFetchRequest.mockImplementationOnce(() => {
      throw new Error('Network Error');
    });

    // Simula il contesto
    render(
      <Router>
        <Ctx.Provider value={mockCtx}>
          <HeaderAccountCustom rootLink={mockRootLink} loggedUser={true} />
        </Ctx.Provider>
      </Router>
    );

    // Chiama la funzione e cattura l'errore
    await mockCtx.setLoggedUserInfo(new Error('Network Error'));

    // Verifica che l'errore sia stato loggato correttamente
    await waitFor(() =>
      expect(consoleErrorMock).toHaveBeenCalledWith('ERROR', expect.any(Error))
    );

    // Verifica che la funzione di navigazione non sia stata chiamata
    expect(mockNavigate).not.toHaveBeenCalled();

    // Ripristina il mock della console
    consoleErrorMock.mockRestore();
  });
});
