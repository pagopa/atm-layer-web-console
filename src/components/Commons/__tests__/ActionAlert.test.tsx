import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ActionAlert } from "../ActionAlert";

let setOpenSnackBar: any;
let handleSwitchAssociationFetch: any;

beforeEach(() => {
  setOpenSnackBar = jest.fn();
  handleSwitchAssociationFetch = jest.fn();
});

describe("ActionAlert", () => {


  test("render with error", () => {
    render(
      <BrowserRouter>
        <ActionAlert
          setOpenSnackBar={setOpenSnackBar}
          openSnackBar={true}
          severity="error"
          message="Errore"
          title="Errore"
          type="DELETE_ASSOCIATION"
          errorCode="ATMLM_4000047"
          handleSwitchAssociationFetch={handleSwitchAssociationFetch}
        />
      </BrowserRouter>
    );

    expect(screen.getByText("Errore")).toBeInTheDocument();
    expect(screen.getByText("Errore, vuoi sostiuire l'associazione per questa banca?")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Sostituisci"));
    expect(handleSwitchAssociationFetch).toHaveBeenCalled();
  });

  test("render with warning", () => {
    render(
      <BrowserRouter>
        <ActionAlert
          setOpenSnackBar={setOpenSnackBar}
          openSnackBar={true}
          severity="warning"
          message="Attenzione"
          title="Attenzione"
          type="DELETE_BPMN"
          handleSwitchAssociationFetch={handleSwitchAssociationFetch}
        />
      </BrowserRouter>
    );

    expect(screen.getAllByText("Attenzione")[0]).toBeInTheDocument();
  });

  test("render without openSnackBar", () => {
    render(
      <BrowserRouter>
        <ActionAlert
          setOpenSnackBar={setOpenSnackBar}
          openSnackBar={false}
          severity="error"
          message="Errore"
          title="Errore"
          type="DELETE_ASSOCIATION"
          errorCode="ATMLM_4000047"
          handleSwitchAssociationFetch={handleSwitchAssociationFetch}
        />
      </BrowserRouter>
    );

    expect(screen.queryByText("Errore")).toBeNull();
  });

  test("navigate to RESOURCES when type is DELETE_RES", () => {
    const { container } = render(
      <BrowserRouter>
        <ActionAlert
          setOpenSnackBar={setOpenSnackBar}
          openSnackBar={true}
          severity="error"
          message="Errore"
          title="Errore"
          type="DELETE_RES"
          handleSwitchAssociationFetch={handleSwitchAssociationFetch}
        />
      </BrowserRouter>
    );

    const buttonElement = container.querySelector('button');
    if (buttonElement) {
      fireEvent.click(buttonElement);
    }
    expect(window.location.pathname).toBe('/');
  });

  test("navigate to WORKFLOW_RESOURCES when type is DELETE_WR", () => {
    const { container } = render(
      <BrowserRouter>
        <ActionAlert
          setOpenSnackBar={setOpenSnackBar}
          openSnackBar={true}
          severity="error"
          message="Errore"
          title="Errore"
          type="DELETE_WR"
          handleSwitchAssociationFetch={handleSwitchAssociationFetch}
        />
      </BrowserRouter>
    );

    const buttonElement = container.querySelector('button');
    if (buttonElement) {
      fireEvent.click(buttonElement);
    }
    expect(window.location.pathname).toBe('/');
  });

  test("reload page when type is included in DEPLOY_VALUES", () => {
    render(
      <BrowserRouter>
        <ActionAlert
          setOpenSnackBar={setOpenSnackBar}
          openSnackBar={true}
          severity="error"
          message="Errore"
          title="Errore"
          type="deployWR"
          handleSwitchAssociationFetch={handleSwitchAssociationFetch}
        />
      </BrowserRouter>
    );
  });


  test("navigate to BPMN when type is DELETE_BPMN with success", () => {
    const { container } = render(
      <BrowserRouter>
        <ActionAlert
          setOpenSnackBar={setOpenSnackBar}
          openSnackBar={true}
          message="Errore"
          title="Errore"
          type="deleteBpmn"
          handleSwitchAssociationFetch={handleSwitchAssociationFetch}
        />
      </BrowserRouter>
    );

    expect(screen.getAllByText("Errore")[0]).toBeInTheDocument();
    const buttonElement = container.querySelector('button');
    if (buttonElement) {
      fireEvent.click(buttonElement);
    }
    expect(window.location.pathname).toBe('/bpmn');
  });

  test("navigate to WR when type is DELETE_WR", () => {
    const { container } = render(
      <BrowserRouter>
        <ActionAlert
          setOpenSnackBar={setOpenSnackBar}
          openSnackBar={true}
          severity="error"
          message="Errore"
          title="Errore"
          type="deleteWR"
          handleSwitchAssociationFetch={handleSwitchAssociationFetch}
        />
      </BrowserRouter>
    );

    expect(screen.getAllByText("Errore")[0]).toBeInTheDocument();
    const buttonElement = container.querySelector('button');
    if (buttonElement) {
      fireEvent.click(buttonElement);
    }
    expect(window.location.pathname).toBe('/workflow_resources');
  });

  test("navigate to Resources when type is DELETE_RES", () => {
    const { container } = render(
      <BrowserRouter>
        <ActionAlert
          setOpenSnackBar={setOpenSnackBar}
          openSnackBar={true}
          severity="error"
          message="Errore"
          title="Errore"
          type="deleteResources"
          handleSwitchAssociationFetch={handleSwitchAssociationFetch}
        />
      </BrowserRouter>
    );

    expect(screen.getAllByText("Errore")[0]).toBeInTheDocument();
    const buttonElement = container.querySelector('button');
    if (buttonElement) {
      fireEvent.click(buttonElement);
    }
    expect(window.location.pathname).toBe('/resources');
  });

  test("setOpenSnackBar(false) when type is not in DEPLOY_VALUES and not matching any other case", () => {
    const { container } = render(
      <BrowserRouter>
        <ActionAlert
          setOpenSnackBar={setOpenSnackBar}
          openSnackBar={true}
          severity="error"
          message="Errore"
          title="Errore"
          type="UNKNOWN_TYPE"
          handleSwitchAssociationFetch={handleSwitchAssociationFetch}
        />
      </BrowserRouter>
    );

    expect(screen.getAllByText("Errore")[0]).toBeInTheDocument();
    const buttonElement = container.querySelector('button');
    if (buttonElement) {
      fireEvent.click(buttonElement);
    }
    expect(setOpenSnackBar).toHaveBeenCalledWith(false);
  });

});
