import { generatePath } from "react-router-dom";
import { BPMN_ASSOCIATED, PROCESS_RESOURCES, RESOURCES, TRANSACTIONS, WORKFLOW_RESOURCE } from "../../commons/constants";
import ROUTES from "../../routes";
import formatValues from "../../utils/formatValues";

const useColumns: any = () => {

	const { formatDateToString, extractRelativeCdnPath } = formatValues();

	const getColumnsGrid: any = (driver: string, showCustomHeader: any, renderCell: any, actionColumn: any, deleteColumn: any) => {

		const functionTypeColumn = {
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
			flex: 1
		};

		const fileNameColumn = {
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
		};

		const statusColumn = {
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
		};

		const createdAtColumn = {
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
			flex: 0.7
		};

		const lastUpdatedAtColumn = {
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
			flex: 0.7
		};

		const createdByColumn = {
			field: "createdBy",
			cellClassName: "justifyContentNormal",
			headerName: "Creata Da",
			align: "left",
			headerAlign: "left",
			editable: false,
			disableColumnMenu: true,
			renderHeader: showCustomHeader,
			renderCell: (params: any) => renderCell(params, params.row.createdBy),
			sortable: false,
			flex: 1
		};

		const lastUpdatedByColumn = {
			field: "lastUpdatedBy",
			cellClassName: "justifyContentNormal",
			headerName: "Modificata Da",
			align: "left",
			headerAlign: "left",
			editable: false,
			disableColumnMenu: true,
			renderHeader: showCustomHeader,
			renderCell: (params: any) => renderCell(params, params.row.lastUpdatedBy),
			sortable: false,
			flex: 1
		};

		const commonActionColumn = (driver: string) => ({
			field: "actions",
			cellClassName: "justifyContentNormalRight",
			headerName: "",
			align: "right",
			hideSortIcons: true,
			disableColumnMenu: true,
			editable: false,
			renderCell: (params: any) => actionColumn(params, driver),
			sortable: false,
			flex: 0.5
		});

		switch (driver) {
		case PROCESS_RESOURCES:
			return [
				functionTypeColumn,
				fileNameColumn,
				statusColumn,
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
					flex: 0.5
				},
				createdAtColumn,
				lastUpdatedAtColumn,
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
					flex: 0.5
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
					flex: 0.5
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
				commonActionColumn(PROCESS_RESOURCES)
			];
		case BPMN_ASSOCIATED:
			return [
				{
					field: "bpmnId",
					cellClassName: "justifyContentNormal",
					headerName: "ID risorsa di processo",
					align: "left",
					headerAlign: "left",
					editable: false,
					disableColumnMenu: true,
					renderHeader: showCustomHeader,
					renderCell: (params: any) => renderCell(params, params.row.bpmnId),
					sortable: false,
					flex: 1
				},
				{
					field: "bpmnModelVersion",
					cellClassName: "justifyContentNormal",
					headerName: "Versione",
					align: "left",
					headerAlign: "left",
					editable: false,
					disableColumnMenu: true,
					renderHeader: showCustomHeader,
					renderCell: (params: any) => renderCell(params, params.row.bpmnModelVersion),
					sortable: false,
					resizable: false,
					flex: 1
				},
				{
					field: "acquirerId",
					cellClassName: "justifyContentNormal",
					headerName: "ID Banca",
					align: "left",
					headerAlign: "left",
					editable: false,
					disableColumnMenu: true,
					renderHeader: showCustomHeader,
					renderCell: (params: any) => renderCell(params, params.row.acquirerId),
					sortable: false,
					flex: 1
				},
				{
					field: "branchId",
					cellClassName: "justifyContentNormal",
					headerName: "ID Filiale",
					align: "left",
					headerAlign: "left",
					editable: false,
					disableColumnMenu: true,
					renderHeader: showCustomHeader,
					renderCell: (params: any) => renderCell(params, params.row.branchId),
					sortable: false,
					flex: 1
				},
				{
					field: "terminalId",
					cellClassName: "justifyContentNormal",
					headerName: "ID Terminale",
					align: "left",
					headerAlign: "left",
					editable: false,
					disableColumnMenu: true,
					renderHeader: showCustomHeader,
					renderCell: (params: any) => renderCell(params, params.row.terminalId),
					sortable: false,
					flex: 1
				},
				functionTypeColumn,
				createdAtColumn,
				lastUpdatedAtColumn,
				createdByColumn,
				lastUpdatedByColumn,
				{
					field: "actions",
					cellClassName: "justifyContentNormal",
					headerName: "",
					align: "right",
					hideSortIcons: true,
					disableColumnMenu: true,
					editable: false,
					renderCell: (params: any) => deleteColumn(params),
					sortable: false,
					flex: 1
				}
			];
		case RESOURCES:
			return [
				{
					field: "resourceId",
					cellClassName: "justifyContentNormal",
					headerName: "ID Risorse statiche",
					align: "left",
					headerAlign: "left",
					editable: false,
					disableColumnMenu: true,
					renderHeader: showCustomHeader,
					renderCell: (params: any) => renderCell(params, params.row.resourceId),
					sortable: false,
					flex: 0.5
				},
				fileNameColumn,
				{
					field: "storageKey",
					cellClassName: "justifyContentNormal",
					headerName: "Percorso file",
					align: "left",
					headerAlign: "left",
					editable: false,
					disableColumnMenu: true,
					renderHeader: showCustomHeader,
					renderCell: (params: any) => renderCell(params, extractRelativeCdnPath((params.row.storageKey).toString())),
					sortable: false,
					flex: 1.7
				},
				{
					field: "resourceType",
					cellClassName: "justifyContentNormal",
					headerName: "Tipo risorsa",
					align: "left",
					headerAlign: "left",
					editable: false,
					disableColumnMenu: true,
					renderHeader: showCustomHeader,
					renderCell: (params: any) => renderCell(params, params.row.resourceType),
					sortable: false,
					flex: 0.5
				},
				createdAtColumn,
				lastUpdatedAtColumn,
				commonActionColumn(RESOURCES)				
			];
		case WORKFLOW_RESOURCE:
			return [
				{
					field: "workflowResourceId",
					cellClassName: "justifyContentNormal",
					headerName: "ID Workflow Resource",
					align: "left",
					headerAlign: "left",
					editable: false,
					disableColumnMenu: true,
					renderHeader: showCustomHeader,
					renderCell: (params: any) => renderCell(params, params.row.workflowResourceId),
					sortable: false,
					flex: 1
				},
				fileNameColumn,
				{
					field: "resourceType",
					cellClassName: "justifyContentNormal",
					headerName: "Tipo risorsa",
					align: "left",
					headerAlign: "left",
					editable: false,
					disableColumnMenu: true,
					renderHeader: showCustomHeader,
					renderCell: (params: any) => renderCell(params, params.row.resourceType),
					sortable: false,
					flex: 1
				},
				statusColumn,
				createdAtColumn,
				lastUpdatedAtColumn,
				createdByColumn,
				lastUpdatedByColumn,
				commonActionColumn(WORKFLOW_RESOURCE)
			];
		case TRANSACTIONS:
			return [
				{
					field: "transactionId",
					cellClassName: "justifyContentNormal",
					headerName: "ID Transazione",
					align: "left",
					headerAlign: "left",
					editable: false,
					disableColumnMenu: true,
					renderHeader: showCustomHeader,
					renderCell: (params: any) => renderCell(params, params.row.transactionId),
					sortable: false,
					flex: 1
				},
				{
					field: "transactionStatus",
					cellClassName: "justifyContentNormal",
					headerName: "Stato",
					align: "left",
					headerAlign: "left",
					editable: false,
					disableColumnMenu: true,
					renderHeader: showCustomHeader,
					renderCell: (params: any) => renderCell(params, params.row.transactionStatus),
					sortable: false,
					flex: 1
				},
				functionTypeColumn,
				{
					field: "acquirerId",
					cellClassName: "justifyContentNormal",
					headerName: "ID Banca",
					align: "center",
					headerAlign: "left",
					editable: false,
					disableColumnMenu: true,
					renderHeader: showCustomHeader,
					renderCell: (params: any) => renderCell(params, params.row.acquirerId),
					sortable: false,
					flex: 0.5
				},
				{
					field: "branchId",
					cellClassName: "justifyContentNormal",
					headerName: "ID Filiale",
					align: "center",
					headerAlign: "left",
					editable: false,
					disableColumnMenu: true,
					renderHeader: showCustomHeader,
					renderCell: (params: any) => renderCell(params, params.row.branchId),
					sortable: false,
					flex: 0.5
				},
				{
					field: "terminalId",
					cellClassName: "justifyContentNormal",
					headerName: "ID Terminale",
					align: "center",
					headerAlign: "left",
					editable: false,
					disableColumnMenu: true,
					renderHeader: showCustomHeader,
					renderCell: (params: any) => renderCell(params, params.row.terminalId),
					sortable: false,
					flex: 0.5
				},
			];
		default:
			return [];
		}
	};
	const getVisibleColumns: any = (driver: string) => {
		switch (driver) {
		case PROCESS_RESOURCES:
			return (
				{
					"enabled": false,
					"deployment_id": false,
					"definition_key": false,
					"description": false,
					"resource": false
				}
			);
		case BPMN_ASSOCIATED:
			return (
				{
					"bpmnId": false,
					"bpmnModelVersion": false,
					"functionType": false,
					"createdAt": false,
					"lastUpdatedAt": false,
					"createdBy": false,
					"lastUpdatedBy": false
				}
			);
		case RESOURCES:
			return (
				{
					"resourceId" : false
				}
			);
		case WORKFLOW_RESOURCE:
			return (
				{
					"workflowResourceId": false,
					"createdBy": false,
					"lastUpdatedBy": false
				}
			);
		default:
			return [];
		}
	};
	const getNavigationPaths: any = (driver: string, param: any) => {
		switch (driver) {
		case PROCESS_RESOURCES:
			return generatePath(ROUTES.BPMN_DETAILS, { bpmnId: param.row.bpmnId, modelVersion: param.row.modelVersion });
		case RESOURCES:
		     return generatePath(ROUTES.RESOURCES_DETAILS, { resourceId: param.row.resourceId });
		case WORKFLOW_RESOURCE:
			return generatePath(ROUTES.WORKFLOW_RESOURCE_DETAILS, { workflowResourceId: param.row.workflowResourceId });
		default:
			return [];
		}
	};

	const getRecordBpmnParams: any = (param: any) => ({
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
		getRecordBpmnParams
	};
};
export default useColumns;
