import { generatePath } from "react-router-dom";
import { BPMN_ASSOCIATED, CAMUNDA_VARIABLES, PROCESS_RESOURCES, RESOURCES, WORKFLOW_RESOURCE } from "../../commons/constants";
import ROUTES from "../../routes";
import formatValues from "../../utils/formatValues";

const useColumns: any = () => {

	const { formatDateToString, extractRelativeCdnPath } = formatValues();

	const getColumnsGrid: any = (driver: string, showCustomHeader: any, renderCell: any, actionColumn: any, deleteColumn: any, deleteColumnVariables: any, editColumnVariables: any) => {

		function newColumn(field:string, headerName:string, renderFunction:any, flex?:number, optionalParams?:any, align?:string){
			return {
				field,
				cellClassName: "justifyContentNormal",
				headerName,
				align: align? align : "left",
				headerAlign: "left",
				editable: false,
				disableColumnMenu: true,
				renderHeader: showCustomHeader,
				renderCell: renderFunction,
				sortable: false,
				flex: flex? flex : 1,
				...optionalParams
			};
		}

		const functionTypeColumn = newColumn("functionType", "Tipo funzione", (params: any) => renderCell(params, params.row.param));
		const fileNameColumn = newColumn("fileName", "Nome file", (params: any) => renderCell(params, params.row.fileName), undefined, {resizable: false});
		const statusColumn = newColumn("status", "Stato", (params: any) => renderCell(params, params.row.status));
		const createdAtColumn = newColumn("createdAt", "Data creazione", (params: any) => renderCell(params, formatDateToString(params.row.createdAt)), 0.7);
		const lastUpdatedAtColumn = newColumn("lastUpdatedAt", "Data ultima modifica", (params: any) => renderCell(params, formatDateToString(params.row.lastUpdatedAt)), 0.7);
		const createdByColumn = newColumn("createdBy", "Creata Da", (params: any) => renderCell(params, params.row.createdBy));
		const lastUpdatedByColumn = newColumn("lastUpdatedBy", "Modificata Da",(params: any) => renderCell(params, params.row.lastUpdatedBy));

		
		// const functionTypeColumn = {
		// 	field: "functionType",
		// 	cellClassName: "justifyContentNormal",
		// 	headerName: "Tipo funzione",
		// 	align: "left",
		// 	headerAlign: "left",
		// 	editable: false,
		// 	disableColumnMenu: true,
		// 	renderHeader: showCustomHeader,
		// 	renderCell: (params: any) => renderCell(params, params.row.functionType),
		// 	sortable: false,
		// 	flex: 1
		// };

		// const fileNameColumn = {
		// 	field: "fileName",
		// 	cellClassName: "justifyContentNormal",
		// 	headerName: "Nome file",
		// 	align: "left",
		// 	headerAlign: "left",
		// 	editable: false,
		// 	disableColumnMenu: true,
		// 	renderHeader: showCustomHeader,
		// 	renderCell: (params: any) => renderCell(params, params.row.fileName),
		// 	sortable: false,
		// 	resizable: false,
		// 	flex: 1
		// };

		// const statusColumn = {
		// 	field: "status",
		// 	cellClassName: "justifyContentNormal",
		// 	headerName: "Stato",
		// 	align: "left",
		// 	headerAlign: "left",
		// 	editable: false,
		// 	disableColumnMenu: true,
		// 	renderHeader: showCustomHeader,
		// 	renderCell: (params: any) => renderCell(params, params.row.status),
		// 	sortable: false,
		// 	flex: 1
		// };

		// const createdAtColumn = {
		// 	field: "createdAt",
		// 	cellClassName: "justifyContentNormal",
		// 	headerName: "Data creazione",
		// 	align: "left",
		// 	headerAlign: "left",
		// 	editable: false,
		// 	disableColumnMenu: true,
		// 	renderHeader: showCustomHeader,
		// 	renderCell: (params: any) => renderCell(params, formatDateToString(params.row.createdAt)),
		// 	sortable: false,
		// 	flex: 0.7
		// };

		

		// const lastUpdatedAtColumn = {
		// 	field: "lastUpdatedAt",
		// 	cellClassName: "justifyContentNormal",
		// 	headerName: "Data ultima modifica",
		// 	align: "left",
		// 	headerAlign: "left",
		// 	editable: false,
		// 	disableColumnMenu: true,
		// 	renderHeader: showCustomHeader,
		// 	renderCell: (params: any) => renderCell(params, formatDateToString(params.row.lastUpdatedAt)),
		// 	sortable: false,
		// 	flex: 0.7
		// };

		

		// const createdByColumn = {
		// 	field: "createdBy",
		// 	cellClassName: "justifyContentNormal",
		// 	headerName: "Creata Da",
		// 	align: "left",
		// 	headerAlign: "left",
		// 	editable: false,
		// 	disableColumnMenu: true,
		// 	renderHeader: showCustomHeader,
		// 	renderCell: (params: any) => renderCell(params, params.row.createdBy),
		// 	sortable: false,
		// 	flex: 1
		// };



		// const lastUpdatedByColumn = {
		// 	field: "lastUpdatedBy",
		// 	cellClassName: "justifyContentNormal",
		// 	headerName: "Modificata Da",
		// 	align: "left",
		// 	headerAlign: "left",
		// 	editable: false,
		// 	disableColumnMenu: true,
		// 	renderHeader: showCustomHeader,
		// 	renderCell: (params: any) => renderCell(params, params.row.lastUpdatedBy),
		// 	sortable: false,
		// 	flex: 1
		// };


		const commonActionColumn = (driver: string) => ( newColumn("actions", "", (params: any) => actionColumn(params, driver), 0.5, {hideSortIcons: true},"right")
		// 	{
		// 	field: "actions",
		// 	cellClassName: "justifyContentNormalRight",
		// 	headerName: "",
		// 	align: "right",
		// 	hideSortIcons: true,
		// 	disableColumnMenu: true,
		// 	editable: false,
		// 	renderCell: (params: any) => actionColumn(params, driver),
		// 	sortable: false,
		// 	flex: 0.5
		// }
		);

		switch (driver) {
		case PROCESS_RESOURCES:
			return [
				functionTypeColumn,
				fileNameColumn,
				statusColumn,
				// {
				// 	field: "modelVersion",
				// 	cellClassName: "justifyContentNormal",
				// 	headerName: "Versione",
				// 	align: "left",
				// 	headerAlign: "left",
				// 	editable: false,
				// 	disableColumnMenu: true,
				// 	renderHeader: showCustomHeader,
				// 	renderCell: (params: any) => renderCell(params, params.row.modelVersion),
				// 	sortable: false,
				// 	flex: 0.5
				// },
				newColumn("modelVersion", "Versione", (params: any) => renderCell(params, params.row.modelVersion), 0.5),
				createdAtColumn,
				lastUpdatedAtColumn,
				newColumn("enabled", "enabled", (params: any) => renderCell(params, params.row.enabled), 0.5),
				newColumn("deployment_id", "deployment_id", (params: any) => renderCell(params, params.row.deployment_id)),
				newColumn("definition_key", "definition_key", (params: any) => renderCell(params, params.row.definition_key),0.5),
				newColumn("description", "description", (params: any) => renderCell(params, params.row.description)),
				newColumn("resource", "resource", (params: any) => renderCell(params, params.row.resourceFile.resource)),
				// {
				// 	field: "enabled",
				// 	cellClassName: "justifyContentNormal",
				// 	headerName: "enabled",
				// 	align: "left",
				// 	headerAlign: "left",
				// 	editable: false,
				// 	disableColumnMenu: true,
				// 	renderHeader: showCustomHeader,
				// 	renderCell: (params: any) => renderCell(params, params.row.enabled),
				// 	sortable: false,
				// 	flex: 0.5
				// },
				// {
				// 	field: "deployment_id",
				// 	cellClassName: "justifyContentNormal",
				// 	headerName: "deployment_id",
				// 	align: "left",
				// 	headerAlign: "left",
				// 	editable: false,
				// 	disableColumnMenu: true,
				// 	renderHeader: showCustomHeader,
				// 	renderCell: (params: any) => renderCell(params, params.row.deployment_id),
				// 	sortable: false,
				// 	flex: 1
				// },
				// {
				// 	field: "definition_key",
				// 	cellClassName: "justifyContentNormal",
				// 	headerName: "definition_key",
				// 	align: "left",
				// 	headerAlign: "left",
				// 	editable: false,
				// 	disableColumnMenu: true,
				// 	renderHeader: showCustomHeader,
				// 	renderCell: (params: any) => renderCell(params, params.row.definition_key),
				// 	sortable: false,
				// 	flex: 0.5
				// },
				// {
				// 	field: "description",
				// 	cellClassName: "justifyContentNormal",
				// 	headerName: "description",
				// 	align: "left",
				// 	headerAlign: "left",
				// 	editable: false,
				// 	disableColumnMenu: true,
				// 	renderHeader: showCustomHeader,
				// 	renderCell: (params: any) => renderCell(params, params.row.description),
				// 	sortable: false,
				// 	flex: 1
				// },
				// {
				// 	field: "resource",
				// 	cellClassName: "justifyContentNormal",
				// 	headerName: "resource",
				// 	align: "left",
				// 	headerAlign: "left",
				// 	editable: false,
				// 	disableColumnMenu: true,
				// 	renderHeader: showCustomHeader,
				// 	renderCell: (params: any) => renderCell(params, params.row.resourceFile.resource),
				// 	sortable: false,
				// 	flex: 1
				// },
				commonActionColumn(PROCESS_RESOURCES)
			];
		case BPMN_ASSOCIATED:
			return [
				newColumn("bpmnId", "ID risorsa di processo",(params: any) => renderCell(params, params.row.bpmnId)),
				newColumn("bpmnModelVersion", "Versione", (params: any) => renderCell(params, params.row.bpmnModelVersion), undefined, {resizable: false}),
				newColumn("acquirerId", "ID Banca", (params: any) => renderCell(params, params.row.acquirerId)),
				newColumn("branchId", "ID Filiale", (params: any) => renderCell(params, params.row.branchId)),
				newColumn("terminalId", "ID Terminale", (params: any) => renderCell(params, params.row.terminalId)),

				// {
				// 	field: "bpmnId",
				// 	cellClassName: "justifyContentNormal",
				// 	headerName: "ID risorsa di processo",
				// 	align: "left",
				// 	headerAlign: "left",
				// 	editable: false,
				// 	disableColumnMenu: true,
				// 	renderHeader: showCustomHeader,
				// 	renderCell: (params: any) => renderCell(params, params.row.bpmnId),
				// 	sortable: false,
				// 	flex: 1
				// },
				// {
				// 	field: "bpmnModelVersion",
				// 	cellClassName: "justifyContentNormal",
				// 	headerName: "Versione",
				// 	align: "left",
				// 	headerAlign: "left",
				// 	editable: false,
				// 	disableColumnMenu: true,
				// 	renderHeader: showCustomHeader,
				// 	renderCell: (params: any) => renderCell(params, params.row.bpmnModelVersion),
				// 	sortable: false,
				// 	resizable: false,
				// 	flex: 1
				// },
				// {
				// 	field: "acquirerId",
				// 	cellClassName: "justifyContentNormal",
				// 	headerName: "ID Banca",
				// 	align: "left",
				// 	headerAlign: "left",
				// 	editable: false,
				// 	disableColumnMenu: true,
				// 	renderHeader: showCustomHeader,
				// 	renderCell: (params: any) => renderCell(params, params.row.acquirerId),
				// 	sortable: false,
				// 	flex: 1
				// },
				// {
				// 	field: "branchId",
				// 	cellClassName: "justifyContentNormal",
				// 	headerName: "ID Filiale",
				// 	align: "left",
				// 	headerAlign: "left",
				// 	editable: false,
				// 	disableColumnMenu: true,
				// 	renderHeader: showCustomHeader,
				// 	renderCell: (params: any) => renderCell(params, params.row.branchId),
				// 	sortable: false,
				// 	flex: 1
				// },
				// {
				// 	field: "terminalId",
				// 	cellClassName: "justifyContentNormal",
				// 	headerName: "ID Terminale",
				// 	align: "left",
				// 	headerAlign: "left",
				// 	editable: false,
				// 	disableColumnMenu: true,
				// 	renderHeader: showCustomHeader,
				// 	renderCell: (params: any) => renderCell(params, params.row.terminalId),
				// 	sortable: false,
				// 	flex: 1
				// },
				functionTypeColumn,
				createdAtColumn,
				lastUpdatedAtColumn,
				createdByColumn,
				lastUpdatedByColumn,
				newColumn("actions", "", (params: any) => deleteColumn(params), undefined, {hideSortIcons: true}, "right")
				// {
				// 	field: "actions",
				// 	cellClassName: "justifyContentNormal",
				// 	headerName: "",
				// 	align: "right",
				// 	hideSortIcons: true,
				// 	disableColumnMenu: true,
				// 	editable: false,
				// 	renderCell: (params: any) => deleteColumn(params),
				// 	sortable: false,
				// 	flex: 1
				// }
			];
		case RESOURCES:
			return [
				newColumn("resourceId", "ID Risorse statiche", (params: any) => renderCell(params, params.row.resourceId), 0.5),
				// {
				// 	field: "resourceId",
				// 	cellClassName: "justifyContentNormal",
				// 	headerName: "ID Risorse statiche",
				// 	align: "left",
				// 	headerAlign: "left",
				// 	editable: false,
				// 	disableColumnMenu: true,
				// 	renderHeader: showCustomHeader,
				// 	renderCell: (params: any) => renderCell(params, params.row.resourceId),
				// 	sortable: false,
				// 	flex: 0.5
				// },
				fileNameColumn,
				newColumn("storageKey", "Percorso file", (params: any) => renderCell(params, extractRelativeCdnPath((params.row.storageKey).toString())), 1.7),
				newColumn("resourceType", "Tipo risorsa", (params: any) => renderCell(params, params.row.resourceType), 0.5),

				// {
				// 	field: "storageKey",
				// 	cellClassName: "justifyContentNormal",
				// 	headerName: "Percorso file",
				// 	align: "left",
				// 	headerAlign: "left",
				// 	editable: false,
				// 	disableColumnMenu: true,
				// 	renderHeader: showCustomHeader,
				// 	renderCell: (params: any) => renderCell(params, extractRelativeCdnPath((params.row.storageKey).toString())),
				// 	sortable: false,
				// 	flex: 1.7
				// },
				// {
				// 	field: "resourceType",
				// 	cellClassName: "justifyContentNormal",
				// 	headerName: "Tipo risorsa",
				// 	align: "left",
				// 	headerAlign: "left",
				// 	editable: false,
				// 	disableColumnMenu: true,
				// 	renderHeader: showCustomHeader,
				// 	renderCell: (params: any) => renderCell(params, params.row.resourceType),
				// 	sortable: false,
				// 	flex: 0.5
				// },
				createdAtColumn,
				lastUpdatedAtColumn,
				commonActionColumn(RESOURCES)				
			];
		case WORKFLOW_RESOURCE:
			return [
				newColumn("workflowResourceId", "ID Workflow Resource", (params: any) => renderCell(params, params.row.workflowResourceId)),
				// {
				// 	field: "workflowResourceId",
				// 	cellClassName: "justifyContentNormal",
				// 	headerName: "ID Workflow Resource",
				// 	align: "left",
				// 	headerAlign: "left",
				// 	editable: false,
				// 	disableColumnMenu: true,
				// 	renderHeader: showCustomHeader,
				// 	renderCell: (params: any) => renderCell(params, params.row.workflowResourceId),
				// 	sortable: false,
				// 	flex: 1
				// },
				fileNameColumn,
				newColumn( "resourceType", "Tipo risorsa", (params: any) => renderCell(params, params.row.resourceType)),
				// {
				// 	field: "resourceType",
				// 	cellClassName: "justifyContentNormal",
				// 	headerName: "Tipo risorsa",
				// 	align: "left",
				// 	headerAlign: "left",
				// 	editable: false,
				// 	disableColumnMenu: true,
				// 	renderHeader: showCustomHeader,
				// 	renderCell: (params: any) => renderCell(params, params.row.resourceType),
				// 	sortable: false,
				// 	flex: 1
				// },
				statusColumn,
				createdAtColumn,
				lastUpdatedAtColumn,
				createdByColumn,
				lastUpdatedByColumn,
				commonActionColumn(WORKFLOW_RESOURCE)
			];
		case CAMUNDA_VARIABLES:
			return [
				newColumn("name", "Nome valiabile", (params: any) => renderCell(params, params.row.name)),
				newColumn("value", "Valore Variabile", (params: any) => renderCell(params, params.row.value)),
				newColumn("action1", "", (params: any) => editColumnVariables(params), undefined, {hideSortIcons: true},"right"),
				newColumn("action2", "", (params: any) => deleteColumnVariables(params), undefined, {hideSortIcons: true}, "right")
				// {
				// 	field: "name",
				// 	cellClassName: "justifyContentNormal",
				// 	headerName: "Nome valiabile",
				// 	align: "left",
				// 	headerAlign: "left",
				// 	editable: false,
				// 	disableColumnMenu: true,
				// 	renderHeader: showCustomHeader,
				// 	renderCell: (params: any) => renderCell(params, params.row.name),
				// 	sortable: false,
				// 	flex: 1
				// },
				// {
				// 	field: "value",
				// 	cellClassName: "justifyContentNormal",
				// 	headerName: "Valore Variabile",
				// 	align: "left",
				// 	headerAlign: "left",
				// 	editable: false,
				// 	disableColumnMenu: true,
				// 	renderHeader: showCustomHeader,
				// 	renderCell: (params: any) => renderCell(params, params.row.value),
				// 	sortable: false,
				// 	flex: 1
				// },
				// {
				// 	field: "action1",
				// 	cellClassName: "justifyContentNormal",
				// 	headerName: "",
				// 	align: "right",
				// 	hideSortIcons: true,
				// 	disableColumnMenu: true,
				// 	editable: false,
				// 	renderCell: (params: any) => editColumnVariables(params),
				// 	sortable: false,
				// 	flex: 1
				// },
				// {
				// 	field: "action2",
				// 	cellClassName: "justifyContentNormal",
				// 	headerName: "",
				// 	align: "right",
				// 	hideSortIcons: true,
				// 	disableColumnMenu: true,
				// 	editable: false,
				// 	renderCell: (params: any) => deleteColumnVariables(params),
				// 	sortable: false,
				// 	flex: 1
				// }
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
			return {};
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
