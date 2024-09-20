import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ModalTemplate from "../ModalTemplate";

describe("ModalTemplate test", () => {
  const mockHandleSubmit = jest.fn();
  const mockSetOpen = jest.fn();
  const mockHandleClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should display the modal with title and content text when open", () => {
    render(
      <BrowserRouter>
        <ModalTemplate
          titleModal="Test Modal"
          contentText="This is a test modal"
          open={true}
          setOpen={mockSetOpen}
          handleSubmit={mockHandleSubmit}
          loading={false}
        />
      </BrowserRouter>
    );

    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("This is a test modal")).toBeInTheDocument();
  });

  test("should call setOpen with false when Annulla button is clicked", () => {
    render(
      <BrowserRouter>
        <ModalTemplate
          titleModal="Test Modal"
          contentText="This is a test modal"
          open={true}
          setOpen={mockSetOpen}
          handleSubmit={mockHandleSubmit}
          loading={false}
        />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText("Annulla"));
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  test("should call custom handleClose when provided and 'Annulla' is clicked", () => {
    render(
      <BrowserRouter>
        <ModalTemplate
          titleModal="Test Modal"
          contentText="This is a test modal"
          open={true}
          setOpen={mockSetOpen}
          handleSubmit={mockHandleSubmit}
          loading={false}
          handleClose={mockHandleClose} // Forniamo un handleClose personalizzato
        />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Annulla"));
    // Verifica che la funzione `mockHandleClose` personalizzata venga chiamata
    expect(mockHandleClose).toHaveBeenCalled();
  });

  test("should use default handleClose if no custom handleClose is provided", () => {
    render(
      <BrowserRouter>
        <ModalTemplate
          titleModal="Test Modal"
          contentText="This is a test modal"
          open={true}
          setOpen={mockSetOpen}
          handleSubmit={mockHandleSubmit}
          loading={false}
          // `handleClose` non è fornito, quindi verrà utilizzata `defaultHandleClose`
        />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Annulla"));
    // Verifica che venga chiamata `setOpen` con `false`, quindi la finestra si chiude
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  test("should call handleSubmit when Conferma button is clicked", () => {
    render(
      <BrowserRouter>
        <ModalTemplate
          titleModal="Test Modal"
          contentText="This is a test modal"
          open={true}
          setOpen={mockSetOpen}
          handleSubmit={mockHandleSubmit}
          loading={false}
        />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Conferma"));
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  test("should display loading spinner on Conferma button when loading is true", () => {
    render(
      <BrowserRouter>
        <ModalTemplate
          titleModal="Test Modal"
          contentText="This is a test modal"
          open={true}
          setOpen={mockSetOpen}
          handleSubmit={mockHandleSubmit}
          loading={true} // Loading attivo
        />
      </BrowserRouter>
    );

    const loadingButton = screen.getByText("Conferma").closest('button');
    expect(loadingButton).toBeDisabled();
  });

  test("should render children components when passed", () => {
    render(
      <BrowserRouter>
        <ModalTemplate
          titleModal="Test Modal"
          contentText="This is a test modal"
          open={true}
          setOpen={mockSetOpen}
          handleSubmit={mockHandleSubmit}
          loading={false}
        >
          <div>Child content</div>
        </ModalTemplate>
      </BrowserRouter>
    );

    expect(screen.getByText("Child content")).toBeInTheDocument();
  });
});
