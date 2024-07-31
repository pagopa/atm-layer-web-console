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
});
