import { BPMN_ASSOCIATED, PROCESS_RESOURCES, RESOURCES, WORKFLOW_RESOURCE } from "../../../commons/constants";
import { bpmnTableMocked } from "../../../components/Mock4Test/BpmnMocks";
import useColumns from "../useColumns";

describe("useColumns", () => {

  test("should return correct navigation paths for PROCESS_RESOURCES", () => {
    const { getNavigationPaths } = useColumns();
    const param = { row: { bpmnId: "123", modelVersion: "v1" } };

    const path = getNavigationPaths(PROCESS_RESOURCES, param);

    expect(path).toBe("/bpmnId/123/modelVersion/v1");
  });

  test("should return correct navigation paths for RESOURCES", () => {
    const { getNavigationPaths } = useColumns();
    const param = { row: { resourceId: "456" } };

    const path = getNavigationPaths(RESOURCES, param);

    expect(path).toBe("/resourceId/456");
  });

  test("should return correct navigation paths for WORKFLOW_RESOURCE", () => {
    const { getNavigationPaths } = useColumns();
    const param = { row: { workflowResourceId: "789" } };

    const path = getNavigationPaths(WORKFLOW_RESOURCE, param);

    expect(path).toBe("/workflowResourceId/789");
  });

  test("should return correct record BPMN params", () => {
    const { getRecordBpmnParams } = useColumns();
    const param = {
      bpmnId: "123",
      fileName: "Process.bpmn",
      modelVersion: "v1",
      status: "Active",
      functionType: "Process",
      createdAt: "2024-03-04T10:00:00Z",
      lastUpdatedAt: "2024-03-04T11:00:00Z"
    };

    const recordParams = getRecordBpmnParams(param);

    expect(recordParams).toEqual({
      bpmnId: "123",
      fileName: "Process.bpmn",
      modelVersion: "v1",
      status: "Active",
      functionType: "Process",
      createdAt: "2024-03-04T10:00:00Z",
      lastUpdatedAt: "2024-03-04T11:00:00Z"
    });
  });

  test("should return correct columns for PROCESS_RESOURCES", () => {
    const { getColumnsGrid } = useColumns();

    const mockRenderCell = jest.fn();

    const columns = getColumnsGrid(PROCESS_RESOURCES, jest.fn(), mockRenderCell, jest.fn());
    const rowData = { functionType: "someValue", resourceFile: { resource: "someValue" } }; // Fornisci i dati del row necessari per il test

    // Chiama renderCell per ogni colonna e verifica che sia chiamata correttamente con i parametri corretti
    columns.forEach((column: any) => {
      // Verifica se la colonna ha una funzione renderCell
      if (column.renderCell) {

        column.renderCell({
          row: rowData,
          value: "Value", // Aggiungi eventuali parametri necessari per la chiamata
        }, mockRenderCell);

        expect(mockRenderCell).toHaveBeenCalledWith(
          expect.objectContaining({
            row: rowData,
            value: "Value", // Assicura che i parametri passati a renderCell siano corretti
          }),
          // Assicura che la funzione mock sia passata come parametro a renderCell
          expect.any(String)
        );
      }
    });

    expect(columns).toHaveLength(12);
    expect(columns[0]).toHaveProperty("field", "functionType");
    expect(columns[1]).toHaveProperty("field", "fileName");
    expect(columns[2]).toHaveProperty("field", "status");
    expect(columns[3]).toHaveProperty("field", "modelVersion");
    expect(columns[4]).toHaveProperty("field", "createdAt");
    expect(columns[5]).toHaveProperty("field", "lastUpdatedAt");
    expect(columns[6]).toHaveProperty("field", "enabled");
    expect(columns[7]).toHaveProperty("field", "deployment_id");
    expect(columns[8]).toHaveProperty("field", "definition_key");
    expect(columns[9]).toHaveProperty("field", "description");
    expect(columns[10]).toHaveProperty("field", "resource");
    expect(columns[11]).toHaveProperty("field", "actions");
  });

  test("should return correct columns for BPMN_ASSOCIATED", () => {
    const { getColumnsGrid } = useColumns();

    const mockRenderCell = jest.fn();

    const columns = getColumnsGrid(BPMN_ASSOCIATED, jest.fn(), mockRenderCell, jest.fn(), jest.fn());
    const rowData = bpmnTableMocked.results[0]

    // Chiama renderCell per ogni colonna e verifica che sia chiamata correttamente con i parametri corretti
    columns.forEach((column: any) => {
      // Verifica se la colonna ha una funzione renderCell
      if (column.renderCell) {// Inserisci qui i dati del row necessari per il test

        column.renderCell({
          row: rowData,
          value: "Value", // Aggiungi eventuali parametri necessari per la chiamata
        }, mockRenderCell);

        expect(mockRenderCell).toHaveBeenCalledWith(
          expect.objectContaining({
            row: rowData,
            value: "Value", // Assicura che i parametri passati a renderCell siano corretti
          }),
          // Assicura che la funzione mock sia passata come parametro a renderCell
          expect.any(String)
        );
      }
    });

    expect(columns).toHaveLength(11);
    expect(columns[0]).toHaveProperty("field", "bpmnId");
    expect(columns[1]).toHaveProperty("field", "bpmnModelVersion");
    expect(columns[2]).toHaveProperty("field", "acquirerId");
    expect(columns[3]).toHaveProperty("field", "branchId");
    expect(columns[4]).toHaveProperty("field", "terminalId");
    expect(columns[5]).toHaveProperty("field", "functionType");
    expect(columns[6]).toHaveProperty("field", "createdAt");
    expect(columns[7]).toHaveProperty("field", "lastUpdatedAt");
    expect(columns[8]).toHaveProperty("field", "createdBy");
    expect(columns[9]).toHaveProperty("field", "lastUpdatedBy");
    expect(columns[10]).toHaveProperty("field", "actions");
  });

  test("should return correct columns for RESOURCES", () => {
    const { getColumnsGrid } = useColumns();

    const mockRenderCell = jest.fn();

    const columns = getColumnsGrid(RESOURCES, jest.fn(), mockRenderCell, jest.fn(), jest.fn());
    const rowData = bpmnTableMocked.results[0]

    // Chiama renderCell per ogni colonna e verifica che sia chiamata correttamente con i parametri corretti
    columns.forEach((column: any) => {
      // Verifica se la colonna ha una funzione renderCell
      if (column.renderCell) {// Inserisci qui i dati del row necessari per il test

        column.renderCell({
          row: rowData,
          value: "Value", // Aggiungi eventuali parametri necessari per la chiamata
        }, mockRenderCell);

        expect(mockRenderCell).toHaveBeenCalledWith(
          expect.objectContaining({
            row: rowData,
            value: "Value", // Assicura che i parametri passati a renderCell siano corretti
          }),
          // Assicura che la funzione mock sia passata come parametro a renderCell
          expect.any(String)
        );
      }
    });

    expect(columns).toHaveLength(6);
    expect(columns[0]).toHaveProperty("field", "resourceId");
    expect(columns[1]).toHaveProperty("field", "fileName");
    expect(columns[2]).toHaveProperty("field", "resourceType");
    expect(columns[3]).toHaveProperty("field", "createdAt");
    expect(columns[4]).toHaveProperty("field", "lastUpdatedAt");
    expect(columns[5]).toHaveProperty("field", "actions");
  });

  test("should return correct columns for WORKFLOW_RESOURCE", () => {
    const { getColumnsGrid } = useColumns();
    const mockRenderCell = jest.fn();

    const columns = getColumnsGrid(WORKFLOW_RESOURCE, jest.fn(), mockRenderCell, jest.fn(), jest.fn());
    const rowData = bpmnTableMocked.results[0];

    // Chiama renderCell per ogni colonna e verifica che sia chiamata correttamente con i parametri corretti
    columns.forEach((column: any) => {
      if (column.renderCell) {

        column.renderCell({
          row: rowData,
          value: "Value", // Aggiungi eventuali parametri necessari per la chiamata
        }, mockRenderCell);
      }
    });

    expect(columns).toHaveLength(9);
    expect(columns[0]).toHaveProperty("field", "workflowResourceId");
    expect(columns[1]).toHaveProperty("field", "fileName");
    expect(columns[2]).toHaveProperty("field", "resourceType");
    expect(columns[3]).toHaveProperty("field", "status");
    expect(columns[4]).toHaveProperty("field", "createdAt");
    expect(columns[5]).toHaveProperty("field", "lastUpdatedAt");
    expect(columns[6]).toHaveProperty("field", "createdBy");
    expect(columns[7]).toHaveProperty("field", "lastUpdatedBy");
    expect(columns[8]).toHaveProperty("field", "actions");
  });

  test("should return correct visible columns for PROCESS_RESOURCES", () => {
    const { getVisibleColumns } = useColumns();

    const visibleColumns = getVisibleColumns(PROCESS_RESOURCES);

    expect(visibleColumns).toEqual({
      "enabled": false,
      "deployment_id": false,
      "definition_key": false,
      "description": false,
      "resource": false
    });
  });

  test("should return correct visible columns for BPMN_ASSOCIATED", () => {
    const { getVisibleColumns } = useColumns();

    const visibleColumns = getVisibleColumns(BPMN_ASSOCIATED);

    expect(visibleColumns).toEqual({
      "bpmnId": false,
      "bpmnModelVersion": false,
      "functionType": false,
      "createdAt": false,
      "lastUpdatedAt": false,
      "createdBy": false,
      "lastUpdatedBy": false
    });
  });

  test("should return correct visible columns for RESOURCES", () => {
    const { getVisibleColumns } = useColumns();

    const visibleColumns = getVisibleColumns(RESOURCES);

    expect(visibleColumns).toEqual({
      "resourceId": false
    });
  });

  test("should return correct visible columns for WORKFLOW_RESOURCE", () => {
    const { getVisibleColumns } = useColumns();

    const visibleColumns = getVisibleColumns(WORKFLOW_RESOURCE);

    expect(visibleColumns).toEqual({
      "workflowResourceId": false,
      "createdBy": false,
      "lastUpdatedBy": false
    });
  });

  test("should generate correct path for invalid driver", () => {
    const { getNavigationPaths } = useColumns();
    const param = { row: { id: "123" } };

    const path = getNavigationPaths("INVALID_DRIVER", param);

    expect(path).toEqual([]);
  });

  test("should return empty array for invalid driver in getColumnsGrid", () => {
    const { getColumnsGrid } = useColumns();

    const columns = getColumnsGrid("INVALID_DRIVER");

    expect(columns).toEqual([]);
  });

  test("should return empty object for invalid driver in getVisibleColumns", () => {
    const { getVisibleColumns } = useColumns();

    const visibleColumns = getVisibleColumns("INVALID_DRIVER");

    expect(visibleColumns).toEqual([]);
  });

  test("should return empty object for invalid driver in getRecordBpmnParams", () => {
    const { getRecordBpmnParams } = useColumns();

    const recordParams = getRecordBpmnParams({});

    expect(recordParams).toEqual({});
  });

});