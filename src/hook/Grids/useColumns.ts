import { BPMN } from "../../commons/constants";

const useColumns:any = () => {
  
	const getColumnsGrid:any = (driver: string, showCustomHeader:any, renderCell:any, showBpmnId:any, actionColumn:any) => {
		switch (driver) {
		case BPMN:
			return [
				{
					field: "functionType",
					cellClassName: "justifyContentNormal",
					headerName: "Tipo funzione",
					align: "left",
					headerAlign: "left",
					editable: false,
					disableColumnMenu: true,
					renderHeader: showCustomHeader,
					renderCell: (params:any) => renderCell(params, params.row.functionType),
					sortable: false,
					flex: 3
				},
				{
					field: "deployedFileName",
					cellClassName: "justifyContentNormal",
					headerName: "Nome file",
					align: "left",
					headerAlign: "left",
					editable: false,
					disableColumnMenu: true,
					renderHeader: showCustomHeader,
					renderCell: (params:any) => renderCell(params, params.row.deployedFileName),
					sortable: false,
					flex: 3
				},
				{
					field: "status",
					cellClassName: "justifyContentNormal",
					headerName: "Stato",
					align: "left",
					headerAlign: "left",
					editable: false,
					disableColumnMenu: true,
					renderHeader: showCustomHeader,
					renderCell: (params:any) => renderCell(params, params.row.status),
					sortable: false,
					flex: 3
				},
				{
					field: "modelVersion",
					cellClassName: "justifyContentNormal",
					headerName: "Versione",
					align: "left",
					headerAlign: "left",
					editable: false,
					disableColumnMenu: true,
					renderHeader: showCustomHeader,
					renderCell: (params:any) => renderCell(params, params.row.modelVersion),
					sortable: false,
					flex: 3
				},
				{
					field: "createdAt",
					cellClassName: "justifyContentNormal",
					headerName: "Data creazione",
					align: "left",
					headerAlign: "left",
					editable: false,
					disableColumnMenu: true,
					renderHeader: showCustomHeader,
					renderCell: (params:any) => renderCell(params, params.row.createdAt),
					sortable: false,
					flex: 3
				},
				{
					field: "lastUpdatedAt",
					cellClassName: "justifyContentNormal",
					headerName: "Data ultima modifica",
					align: "left",
					headerAlign: "left",
					editable: false,
					disableColumnMenu: true,
					renderHeader: showCustomHeader,
					renderCell: (params:any) => renderCell(params, params.row.lastUpdatedAt),
					sortable: false,
					flex: 3
				},
				{
					field: "bpmnId",
					cellClassName: "justifyContentBold",
					headerName: "bpmnId",
					align: "left",
					headerAlign: "left",
					editable: false,
					disableColumnMenu: true,
					renderHeader: showCustomHeader,
					renderCell: (params: any) => showBpmnId(params),
					sortable: false,
					flex: 4
				},
				{
					field: "enabled",
					cellClassName: "justifyContentNormal",
					headerName: "enabled",
					align: "left",
					headerAlign: "left",
					editable: false,
					disableColumnMenu: true,
					renderHeader: showCustomHeader,
					renderCell: (params:any)=> renderCell(params, params.row.enabled),
					sortable: false,
					flex: 3
				},
				{
					field: "deployment_id",
					cellClassName: "justifyContentNormal",
					headerName: "deployment_id",
					align: "left",
					headerAlign: "left",
					editable: false,
					disableColumnMenu: true,
					renderHeader: showCustomHeader,
					renderCell: (params:any) => renderCell(params, params.row.deployment_id),
					sortable: false,
					flex: 3
				},
				{
					field: "definition_key",
					cellClassName: "justifyContentNormal",
					headerName: "definition_key",
					align: "left",
					headerAlign: "left",
					editable: false,
					disableColumnMenu: true,
					renderHeader: showCustomHeader,
					renderCell: (params:any) => renderCell(params, params.row.definition_key),
					sortable: false,
					flex: 3
				},
				{
					field: "description",
					cellClassName: "justifyContentNormal",
					headerName: "description",
					align: "left",
					headerAlign: "left",
					editable: false,
					disableColumnMenu: true,
					renderHeader: showCustomHeader,
					renderCell: (params:any) => renderCell(params, params.row.description),
					sortable: false,
					flex: 3
				},
				{
					field: "resource",
					cellClassName: "justifyContentNormal",
					headerName: "resource",
					align: "left",
					headerAlign: "left",
					editable: false,
					disableColumnMenu: true,
					renderHeader: showCustomHeader,
					renderCell: (params:any) => renderCell(params, params.row.resourceFile.resource),
					sortable: false,
					flex: 3
				},
				{
					field: "actions",
					cellClassName: "justifyContentNormalRight",
					headerName: "",
					align: "right",
					hideSortIcons: true,
					disableColumnMenu: true,
					editable: false,
					renderCell: (params:any) => actionColumn(params),
					sortable: false,
					flex: 1
				}
			];
		default:
			return [];
		}
	};
	const getVisibleColumns:any = (driver: string) => {
		switch (driver) {
		case BPMN:
			return (
				{
					"bpmnId":false,
					"enabled":false
				}
			);
		default:
			return [];
		}
	};
	return { getColumnsGrid, getVisibleColumns };
};
export default useColumns;
