import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HeaderAccountCustom } from '../HeaderAccountCustom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Ctx } from '../../../DataContext';
import ROUTES from '../../../routes';
import { PROFILE, USER_INFO } from '../../../commons/endpoints';
import { fetchRequest } from '../../../hook/fetch/fetchRequest';

jest.mock("../../../hook/fetch/fetchRequest", () => ({
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
      {
        description: 'Rilascio BPMN',
        profileId: 3,
        createdAt: '2024-05-27',
        lastUpdatedAt: '2024-05-27',
      },
      {
        description: 'Emulator',
        profileId: 4,
        createdAt: '2024-05-27',
        lastUpdatedAt: '2024-05-27',
      },
      {
        description: 'Gestione utenti',
        profileId: 5,
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

  test('renders HeaderAccountCustom component with EmulatorButton', () => {
    render(
      <Router>
        <Ctx.Provider value={mockCtx}>
          <HeaderAccountCustom rootLink={mockRootLink} loggedUser={true} />
        </Ctx.Provider>
      </Router>
    );

    expect(screen.getByText('Logo')).toBeInTheDocument();
    expect(screen.getByText('Esci')).toBeInTheDocument();
  });

//   test('calls getUserInfo and getAllProfilesList on mount', async () => {
//     mockFetchRequest.mockImplementation(({ urlEndpoint }) => {
//       if (urlEndpoint === USER_INFO) {
//         return async () => ({ success: true, valuesObj: { name: 'John', surname: 'Doe', profiles: [1] } });
//       }
//       if (urlEndpoint === PROFILE) {
//         return async () => ({ success: true, valuesObj: { profiles: [1, 2, 3] } });
//       }
//       return async () => ({});
//     });

//     render(
//       <Router>
//         <Ctx.Provider value={{ ...mockCtx, loggedUserInfo: { userId: null } }}>
//           <HeaderAccountCustom rootLink={mockRootLink} loggedUser={true} />
//         </Ctx.Provider>
//       </Router>
//     );

//     await waitFor(() => {
//       expect(mockCtx.setLoggedUserInfo).toHaveBeenCalledWith({ name: 'John', surname: 'Doe', profiles: [1] });
//       expect(mockCtx.setProfilesAvailable).toHaveBeenCalledWith([1, 2, 3]);
//     });
//   });

//   test('navigates to unauthorized page if no profiles', async () => {
//     mockFetchRequest.mockImplementation(({ urlEndpoint }) => {
//       if (urlEndpoint === USER_INFO) {
//         return async () => ({ success: true, valuesObj: { name: 'John', surname: 'Doe', profiles: [] } });
//       }
//       return async () => ({});
//     });

//     render(
//       <Router>
//         <Ctx.Provider value={{ ...mockCtx, loggedUserInfo: { userId: null } }}>
//           <HeaderAccountCustom rootLink={mockRootLink} loggedUser={true} />
//         </Ctx.Provider>
//       </Router>
//     );

//     await waitFor(() => {
//       expect(mockNavigate).toHaveBeenCalledWith(ROUTES.UNAUTHORIZED_PAGE);
//     });
//   });

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
});
