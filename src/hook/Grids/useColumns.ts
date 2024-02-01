import { generatePath } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import { BPMN } from "../../commons/constants";
import ROUTES from "../../routes";
import formatValues from "../../utils/formatValues";

const useColumns: any = () => {

	const { formatDateToString } = formatValues();
	const getColumnsGrid: any = (driver: string, showCustomHeader: any, renderCell: any, showBpmnId: any, actionColumn: any) => {
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
					renderCell: (params: any) => renderCell(params, params.row.functionType),
					sortable: false,
					flex: 2
				},
				{
					field: "fileName",
					cellClassName: "justifyContentNormal",
					headerName: "Nome file",
					align: "left",
					headerAlign: "left",
					editable: false,
					disableColumnMenu: true,
					renderHeader: showCustomHeader,
					renderCell: (params: any) => renderCell(params, params.row.fileName),
					sortable: false,
					resizable: false,
					flex: 1
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
					renderCell: (params: any) => renderCell(params, params.row.status),
					sortable: false,
					flex: 1
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
					renderCell: (params: any) => renderCell(params, params.row.modelVersion),
					sortable: false,
					flex: 1
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
					renderCell: (params: any) => renderCell(params, formatDateToString(params.row.createdAt)),
					sortable: false,
					flex: 1
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
					renderCell: (params: any) => renderCell(params, formatDateToString(params.row.lastUpdatedAt)),
					sortable: false,
					flex: 1
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
					flex: 1
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
					renderCell: (params: any) => renderCell(params, params.row.enabled),
					sortable: false,
					flex: 1
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
					renderCell: (params: any) => renderCell(params, params.row.deployment_id),
					sortable: false,
					flex: 1
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
					renderCell: (params: any) => renderCell(params, params.row.definition_key),
					sortable: false,
					flex: 1
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
					renderCell: (params: any) => renderCell(params, params.row.description),
					sortable: false,
					flex: 1
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
					renderCell: (params: any) => renderCell(params, params.row.resourceFile.resource),
					sortable: false,
					flex: 1
				},
				{
					field: "actions",
					cellClassName: "justifyContentNormalRight",
					headerName: "",
					align: "right",
					hideSortIcons: true,
					disableColumnMenu: true,
					editable: false,
					renderCell: (params: any) => actionColumn(params),
					sortable: false,
					flex: 0.5
				}
			];
		default:
			return [];
		}
	};
	const getVisibleColumns: any = (driver: string) => {
		switch (driver) {
		case BPMN:
			return (
				{
					"bpmnId": false,
					"enabled": false,
					"deployment_id": false,
					"definition_key": false,
					"description": false,
					"resource": false
				}
			);
		default:
			return [];
		}
	};
	const getNavigationPaths: any = (driver: string, param: any) => {
		switch (driver) {
		case BPMN:
			return generatePath(ROUTES.BPMN_DETAILS, { bpmnId: param.row.bpmnId, modelVersion: param.row.modelVersion });

		default:
			return [];
		}
	};

	const getRecordParams: any = (param: any) => ({
		bpmnId: param.bpmnId,
		fileName: param.fileName,
		modelVersion: param.modelVersion,
		status: param.status,
		functionType: param.functionType,
		createdAt: param.createdAt,
		lastUpdatedAt: param.lastUpdatedAt
	});

	return {
		getColumnsGrid,
		getVisibleColumns,
		getNavigationPaths,
		getRecordParams
	};
};
export default useColumns;
