import { act } from "react-dom/test-utils";
import { breadCrumbLinkComponent, commonBreadRoot, getQueryString, getTextModal, handleSnackbar, removeArrayItem, removeArrayItems, resetErrors } from "../Commons";
import { ALERT_ERROR, ALERT_SUCCESS, DELETE_ASSOCIATION, DELETE_BPMN, DELETE_RES, DELETE_WR, DEPLOY_BPMN, DEPLOY_WR, DOWNLOAD_BPMN, DOWNLOAD_RES, DOWNLOAD_WR, PROCESS_RESOURCES, RESOURCES, ROLLBACK_WR, UPDATE_RES, UPDATE_WR, WORKFLOW_RESOURCE } from "../../../commons/constants";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, generatePath } from "react-router-dom";
import ROUTES from "../../../routes";

describe("resetErrors", () => {
  test("reset specific error", () => {
    const errors = { field1: "Errore 1", field2: "Errore 2" };
    let mockErrors = { ...errors };
    const setErrors = (func: any) => {
      mockErrors = func(mockErrors);
    };

    act(() => {
      resetErrors(errors, setErrors, "field1");
    });

    expect(mockErrors).toEqual({ field2: "Errore 2" });
  });

  test("should not reset a specific field error if it does not exist", () => {
    const errors = { field1: "Errore 1", field2: "Errore 2" };
    let mockErrors = { ...errors };
    const setErrors = (func: any) => {
      mockErrors = func(mockErrors);
    };

    act(() => {
      resetErrors(errors, setErrors, "fieldNonEsistente");
    });

    expect(mockErrors).toEqual(errors);
  });
});


describe("getQueryString", () => {
  const filterValues = {
    functionType: "funzione",
    fileName: "nomefile",
    modelVersion: "versione",
    acquirerId: "acquirente",
    status: "stato",
    noDeployableResourceType: "risorsa",
    resourceType: "tipoRisorsa",
    branchId: "branch",
    terminalId: "terminale"
  };
  const URL = "www.example.com";

  test("querystring PROCESS_RESOURCES", () => {
    const driver = PROCESS_RESOURCES;
    const result = getQueryString(filterValues, driver, URL);
    expect(result).toEqual("www.example.com&functionType=FUNZIONE&fileName=nomefile&modelVersion=versione&acquirerId=acquirente&status=stato");
  });

  test("querystring RESOURCES", () => {
    const driver = RESOURCES;
    const result = getQueryString(filterValues, driver, URL);
    expect(result).toEqual("www.example.com&fileName=nomefile&noDeployableResourceType=risorsa");
  });

  test("querystring WORKFLOW_RESOURCE", () => {
    const driver = WORKFLOW_RESOURCE;
    const result = getQueryString(filterValues, driver, URL);
    expect(result).toEqual("www.example.com&resourceType=tipoRisorsa&fileName=nomefile&status=stato");
  });

  test("querystring DELETE_ASSOCIATION", () => {
    const driver = DELETE_ASSOCIATION;
    const result = getQueryString(filterValues, driver, URL);
    expect(result).toEqual("www.example.com&branchId=branch&terminalId=terminale");
  });

  test("querystring driver not present", () => {
    const driver = "DRIVER_NON_GESTITO";
    const result = getQueryString(filterValues, driver, URL);
    expect(result).toEqual("");
  });

  describe("handleSnackbar", () => {
    test("success", () => {
      const setMessage = jest.fn();
      const setSeverity = jest.fn();
      const setTitle = jest.fn();
      const setOpenSnackBar = jest.fn();

      handleSnackbar(ALERT_SUCCESS, setMessage, setSeverity, setTitle, setOpenSnackBar);

      expect(setSeverity).toHaveBeenCalledWith("success");
      expect(setMessage).toHaveBeenCalledWith("");
      expect(setTitle).toHaveBeenCalledWith("Successo");
      expect(setOpenSnackBar).toHaveBeenCalledWith(true);
    });

    test("error", () => {
      const setMessage = jest.fn();
      const setSeverity = jest.fn();
      const setTitle = jest.fn();
      const setOpenSnackBar = jest.fn();

      handleSnackbar(ALERT_ERROR, setMessage, setSeverity, setTitle, setOpenSnackBar, "Errore specifico");

      expect(setSeverity).toHaveBeenCalledWith("error");
      expect(setMessage).toHaveBeenCalledWith("Errore specifico");
      expect(setTitle).toHaveBeenCalledWith("Errore");
      expect(setOpenSnackBar).toHaveBeenCalledWith(true);
    });
  });

  describe("breadCrumbLinkComponent", () => {
    test("render link and message", () => {
      const arrLinks = [
        { rootValue: "/path1", rootName: "Link 1" },
        { rootValue: "/path2", rootName: "Link 2" },
      ];
      const message = "Messaggio finale";

      render(
        <BrowserRouter>
          {breadCrumbLinkComponent(arrLinks, message)}
        </BrowserRouter>
      );

      expect(screen.getByText("Link 1")).toBeInTheDocument();
      expect(screen.getByText("Link 2")).toBeInTheDocument();
      expect(screen.getByText("Messaggio finale")).toBeInTheDocument();
    });
  });
});

describe("commonBreadRoot", () => {
  const recordParams = {
    bpmnId: "bpmnId",
    modelVersion: "modelVersion",
    resourceId: "resourceId",
    workflowResourceId: "workflowResourceId"
  };

  test("generate link for BPMN", () => {
    const currentPage = { isBpmn: true };
    const isDetail = false;

    const result = commonBreadRoot(currentPage, isDetail, recordParams);

    expect(result).toEqual([
      { rootValue: ROUTES.HOME, rootName: "Home" },
      { rootValue: ROUTES.BPMN, rootName: "Risorse di processo" }
    ]);
  });

  test("generate link for BPMN detail page", () => {
    const currentPage = { isBpmn: true };
    const isDetail = true;

    const result = commonBreadRoot(currentPage, isDetail, recordParams);

    expect(result).toEqual([
      { rootValue: ROUTES.HOME, rootName: "Home" },
      { rootValue: ROUTES.BPMN, rootName: "Risorse di processo" },
      { rootValue: generatePath(ROUTES.BPMN_DETAILS, { bpmnId: recordParams.bpmnId, modelVersion: recordParams.modelVersion }), rootName: "Dettaglio risorsa di processo" }
    ]);
  });
  test("generate link for Static Resource", () => {
    const currentPage = { isStatic: true };
    const isDetail = false;

    const result = commonBreadRoot(currentPage, isDetail, recordParams);

    expect(result).toEqual([
      { rootValue: ROUTES.HOME, rootName: "Home" },
      { rootValue: ROUTES.RESOURCES, rootName: "Risorse statiche" }
    ]);
  });

  test("generate link for Static Resource detail page", () => {
    const currentPage = { isStatic: true };
    const isDetail = true;

    const result = commonBreadRoot(currentPage, isDetail, recordParams);

    expect(result).toEqual([
      { rootValue: ROUTES.HOME, rootName: "Home" },
      { rootValue: ROUTES.RESOURCES, rootName: "Risorse statiche" },
      { rootValue: generatePath(ROUTES.RESOURCES_DETAILS, { resourceId: recordParams.resourceId }), rootName: "Dettaglio risorsa statica" }
    ]);
  });

  test("generate link for Workflow Resource", () => {
    const currentPage = { isWR: true };
    const isDetail = false;

    const result = commonBreadRoot(currentPage, isDetail, recordParams);

    expect(result).toEqual([
      { rootValue: ROUTES.HOME, rootName: "Home" },
      { rootValue: ROUTES.WORKFLOW_RESOURCES, rootName: "Risorse aggiuntive per processi" }
    ]);
  });

  test("generate link for Workflow Resource detail page", () => {
    const currentPage = { isWR: true };
    const isDetail = true;

    const result = commonBreadRoot(currentPage, isDetail, recordParams);

    expect(result).toEqual([
      { rootValue: ROUTES.HOME, rootName: "Home" },
      { rootValue: ROUTES.WORKFLOW_RESOURCES, rootName: "Risorse aggiuntive per processi" },
      { rootValue: generatePath(ROUTES.WORKFLOW_RESOURCE_DETAILS, { workflowResourceId: recordParams.workflowResourceId }), rootName: "Dettaglio risorsa aggiuntiva per processo" }
    ]);
  });
});

describe("getTextModal", () => {
  test("check for title and message in cases", () => {
    expect(getTextModal(ROLLBACK_WR)).toEqual({ titleModal: "Ripristino risorsa aggiuntiva per processo", contentText: "Sei sicuro di voler ripristinare la versione precedente della risorsa?" });
    expect(getTextModal(DEPLOY_BPMN)).toEqual({ titleModal: "Rilascio risorsa di processo", contentText: "Sei sicuro di voler rilasciare questa risorsa di proccesso?" });
    expect(getTextModal(DEPLOY_WR)).toEqual({ titleModal: "Rilascio risorsa aggiuntiva per processo", contentText: "Sei sicuro di voler rilasciare questa risorsa aggiuntiva di processo?" });
    expect(getTextModal(DELETE_BPMN)).toEqual({ titleModal: "Cancellazione risorsa di processo", contentText: "Sei sicuro di voler cancellare questa risorsa di proccesso?" });
    expect(getTextModal(DELETE_ASSOCIATION)).toEqual({ titleModal: "Eliminazione Associazione", contentText: "Sei sicuro di voler eliminare questa associazione?" });
    expect(getTextModal(DELETE_RES)).toEqual({ titleModal: "Cancellazione risorsa statica", contentText: "Sei sicuro di voler cancellare questa risorsa statica?" });
    expect(getTextModal(DELETE_WR)).toEqual({ titleModal: "Cancellazione risorsa aggiuntiva per processo", contentText: "Sei sicuro di voler cancellare questa risorsa aggiuntiva di processo?" });
    expect(getTextModal(DOWNLOAD_BPMN)).toEqual({ titleModal: "Scarica risorsa di processo", contentText: "Sei sicuro di voler scaricare questa risorsa?" });
    expect(getTextModal(DOWNLOAD_RES)).toEqual({ titleModal: "Scarica risorsa statica", contentText: "Sei sicuro di voler scaricare questa risorsa statica?" });
    expect(getTextModal(DOWNLOAD_WR)).toEqual({ titleModal: "Scarica risorsa aggiuntiva di processo", contentText: "Sei sicuro di voler scaricare questa risorsa aggiuntiva di processo?" });
    expect(getTextModal(UPDATE_WR)).toEqual({ titleModal: "Update risorsa aggiuntiva per processo", contentText: "Carica il file aggiornato*:" });
    expect(getTextModal(UPDATE_RES)).toEqual({ titleModal: "Update risorsa statica", contentText: "Carica il file aggiornato" });
  });

  test("check error in default case", () => {
    expect(getTextModal("TIPO_NON_GESTITO")).toEqual({ titleModal: "Errore", contentText: "Qualcosa è andato storto" });
  });
});


describe("Test removeArrayItems", () => {
  test("method removes undefined indexes, orders them, removes corresponding items from array", () => {
    const indexes = [5,undefined,1,0];
    const arrayToTrim = [0,1,2,3,4,5,6,7,8,9];
    const expectedArray = [2,3,4,6,7,8,9];
    const trimmedArray = removeArrayItems(indexes, arrayToTrim);
    expect(trimmedArray).toEqual(expectedArray);
  });

});

describe("Test removeArrayItem", () => {
  test("remove item from array defined", () => {
    const arrayToTrim = [0,1,2];
    const trimmedArray = removeArrayItem(1,arrayToTrim);
    const expectedArray = [0,2];
    expect(trimmedArray).toEqual(expectedArray);
    const noResult = removeArrayItem(1, undefined);
    expect(noResult).toBeUndefined();
  })
});