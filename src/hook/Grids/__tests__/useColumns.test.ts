import { BPMN_ASSOCIATED, PROCESS_RESOURCES, RESOURCES, WORKFLOW_RESOURCE } from "../../../commons/constants";
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

    const columns = getColumnsGrid(PROCESS_RESOURCES);

    expect(columns).toHaveLength(12);
    expect(columns[0]).toHaveProperty("field", "functionType");
    expect(columns[1]).toHaveProperty("field", "fileName");
    // Aggiungi altre asserzioni per verificare che le colonne corrette siano presenti
  });

  test("should return correct columns for BPMN_ASSOCIATED", () => {
    const { getColumnsGrid } = useColumns();

    const columns = getColumnsGrid(BPMN_ASSOCIATED);

    expect(columns).toHaveLength(11);
    expect(columns[0]).toHaveProperty("field", "bpmnId");
    expect(columns[1]).toHaveProperty("field", "bpmnModelVersion");
    // Aggiungi altre asserzioni per verificare che le colonne corrette siano presenti
  });

  test("should return correct columns for RESOURCES", () => {
    const { getColumnsGrid } = useColumns();

    const columns = getColumnsGrid(RESOURCES);

    expect(columns).toHaveLength(6);
    expect(columns[0]).toHaveProperty("field", "resourceId"); 
    expect(columns[1]).toHaveProperty("field", "fileName");
    // Aggiungi altre asserzioni per verificare che le colonne corrette siano presenti
  });

  test("should return correct columns for WORKFLOW_RESOURCE", () => {
    const { getColumnsGrid } = useColumns();

    const columns = getColumnsGrid(WORKFLOW_RESOURCE);

    expect(columns).toHaveLength(9);
    expect(columns[0]).toHaveProperty("field", "workflowResourceId");
    expect(columns[1]).toHaveProperty("field", "fileName");
    // Aggiungi altre asserzioni per verificare che le colonne corrette siano presenti
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