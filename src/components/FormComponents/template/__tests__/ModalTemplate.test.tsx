import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ModalTemplate from "../ModalTemplate";

describe("ModalTemplate test", () => {
  const mockHandleSubmit = jest.fn();
  const mockSetOpen = jest.fn();

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

  test("should close the modal when reason is not 'backdropClick'", () => {
    const mockSetOpen = jest.fn();
    const handleSubmit = jest.fn();
  
    // Render del componente ModalTemplate con la prop open impostata su true
    render(
      <ModalTemplate
        titleModal="Test Modal"
        contentText="Questo è il contenuto della modale"
        open={true}
        setOpen={mockSetOpen}
        handleSubmit={handleSubmit}
      />
    );
  
    // Simula la chiusura del dialogo con un motivo diverso da 'backdropClick'
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' }); // Simula la pressione del tasto Escape
  
    // Verifica che la funzione setOpen sia stata chiamata con false
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

//   test("should hide the Annulla button when canOnlyConfirm is true", () => {
//     render(
//       <BrowserRouter>
//         <ModalTemplate
//           titleModal="Test Modal"
//           contentText="This is a test modal"
//           open={true}
//           setOpen={mockSetOpen}
//           handleSubmit={mockHandleSubmit}
//           loading={false}
//           canOnlyConfirm={true}
//         />
//       </BrowserRouter>
//     );

//     const annullaButton = screen.getByText("Annulla");

//     expect(annullaButton).not.toBeVisible();

//     expect(annullaButton).toHaveStyle("display: inline-flex");
//   });
});
