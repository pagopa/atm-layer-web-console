/* eslint-disable prefer-const */
/* eslint-disable functional/no-let */
/* eslint-disable functional/immutable-data */
import { Link } from "@mui/material";
import { generatePath } from "react-router-dom";
import { BPMN, DELETE_ASSOCIATION, DELETE_BPMN, DELETE_RES, DELETE_WR, DEPLOY, DEPLOY_WR, DOWNLOAD, DOWNLOAD_RES, DOWNLOAD_WR, RESOURCES, ROLLBACK_WR, UPDATE_RES, UPDATE_WR, WORKFLOW_RESOURCE } from "../../commons/constants";
import ROUTES from "../../routes";
import { LinkModelDto, PageDto } from "../../model/LinkModel";


export const resetErrors = (errors: any, setErrors: any, field: string | number) => {
	if (field) {
		// reset errore specifico field
		if (errors[field]) {
			setErrors((prevErrors: { [x: string]: any }) => {
				delete prevErrors[field];
				return { ...prevErrors };
			});
		}
	} else {
		// reset di tutti gli errori dei field
		setErrors((prevErrors: any) => {
			let newErr: any;
			for (let e of Object.keys(prevErrors)) {
				delete newErr[e];
				newErr = { ...newErr };
			}
			return newErr;
		});
	}
};

export const getQueryString = ( filterValues: any, driver: string, URL?: string) => {
	
	let queryString="";
	if(URL&& URL!=="") {
	  queryString = queryString.concat(URL);
	}
		
	switch (driver) {
	case BPMN:
		if (filterValues?.functionType) {
			queryString = queryString.concat(`&functionType=${filterValues.functionType.toUpperCase()}`);
		}

		if (filterValues?.fileName) {
			queryString = queryString.concat(`&fileName=${filterValues.fileName}`);
		}

		if (filterValues?.modelVersion) {
			queryString = queryString.concat(`&modelVersion=${filterValues.modelVersion}`);
		}

		if (filterValues?.acquirerId) {
			queryString = queryString.concat(`&acquirerId=${filterValues.acquirerId}`);
		}

		if (filterValues?.status) {
			queryString = queryString.concat(`&status=${filterValues.status}`);
		}
		break;
	case RESOURCES:
		if (filterValues?.fileName) {
			queryString = queryString.concat(`&fileName=${filterValues.fileName}`);
		}

		if (filterValues?.noDeployableResourceType) {
			queryString = queryString.concat(`&noDeployableResourceType=${filterValues.noDeployableResourceType}`);
		}
		break;
	case WORKFLOW_RESOURCE:

		if (filterValues?.resourceType) {
			queryString = queryString.concat(`&resourceType=${filterValues.resourceType}`);
		}

		if (filterValues?.fileName) {
			queryString = queryString.concat(`&fileName=${filterValues.fileName}`);
		}

		if (filterValues?.status) {
			queryString = queryString.concat(`&status=${filterValues.status}`);
		}
		break;
	case DELETE_ASSOCIATION:
		if (filterValues?.branchId) {
			queryString = queryString.concat(`&branchId=${filterValues.branchId}`);
		}

		if (filterValues?.terminalId) {
			queryString = queryString.concat(`&terminalId=${filterValues.terminalId}`);
		}
		break;
	default:
		return "";
	}

	return queryString;
};

export const handleSnackbar = (
	success: boolean,
	setMessage: React.Dispatch<React.SetStateAction<any>>,
	setSeverity: React.Dispatch<React.SetStateAction<any>>,
	setTitle: React.Dispatch<React.SetStateAction<any>>,
	setOpenSnackBar: React.Dispatch<React.SetStateAction<any>>,
	valueMessage?: string
) => {
	setSeverity(success ? "success" : "error");
	setMessage(success ? "" : valueMessage ? valueMessage : "Operazione fallita");
	setTitle(success ? "Successo" : "Errore");
	setOpenSnackBar(true);
};

export const breadCrumbLinkComponent = (arrLinks: Array<LinkModelDto>, message: string) => [
	// "Home",
	...arrLinks.map((e, i) =>
		<Link
			key="link"
			href={process.env.REACT_APP_HOME_PATH+ e.rootValue}
			color="inherit"
			underline="hover"
		>
			{e.rootName}
		</Link>	
	),
	message
];

export const commonBreadRoot = (currentPage:PageDto, isDetail:boolean=false, recordParams?: any ) => {
	let links=[
		{
			rootValue: ROUTES.HOME,
			rootName: "Home"
		}		
	];
	if(currentPage?.isBpmn){
		links.push(
			{
				rootValue: ROUTES.BPMN,
				rootName: "Risorse di processo"
			}
		);
	}
	if(currentPage?.isBpmn && isDetail){
		links.push({
			rootValue: generatePath(ROUTES.BPMN_DETAILS, { bpmnId: recordParams?.bpmnId, modelVersion: recordParams?.modelVersion }),
			rootName: "Dettaglio risorsa di processo"

		});
	}
	if(currentPage?.isStatic){
		links.push(
			{
				rootValue: ROUTES.RESOURCES,
				rootName: "Risorse statiche"
			}
		);
	}
	if(currentPage?.isStatic && isDetail){
		links.push({
			rootValue: generatePath(ROUTES.RESOURCES_DETAILS, { resourceId: recordParams?.resourceId }),
			rootName: "Dettaglio risorsa statica"

		});
	}
	if(currentPage?.isWR){
		links.push(
			{
				rootValue: ROUTES.WORKFLOW_RESOURCES,
				rootName: "Risorse aggiuntive per processi"
			}
		);
	}
	if(currentPage?.isWR && isDetail){
		links.push({
			rootValue: generatePath(ROUTES.WORKFLOW_RESOURCE_DETAILS, { workflowResourceId: recordParams?.workflowResourceId }),
			rootName: "Dettaglio risorsa aggiuntiva per processo"

		});
	}
	return links;
};

export function getTextModal(type:string):any {
	
	switch (type) {
	case ROLLBACK_WR: {
		return {titleModal:"Ripristino risorsa aggiuntiva per processo", contentText:"Sei sicuro di voler ripristinare la versione precedente della risorsa?"};
	}
	case DEPLOY: {
		return {titleModal:"Rilascio risorsa di processo", contentText:"Sei sicuro di voler rilasciare questa risorsa di proccesso?"};
	}
	case DEPLOY_WR: {
		return {titleModal:"Rilascio risorsa aggiuntiva per processo", contentText:"Sei sicuro di voler rilasciare questa risorsa aggiuntiva di processo?"};
	}
	case DELETE_BPMN: {
		return {titleModal:"Cancellazione risorsa di processo", contentText:"Sei sicuro di voler cancellare questa risorsa di proccesso?"};
	}
	case DELETE_ASSOCIATION: {
		return {titleModal:"Eliminazione Associazione", contentText:"Sei sicuro di voler eliminare questa associazione?"};
	}
	case DELETE_RES: {
		return {titleModal:"Cancellazione risorsa statica", contentText:"Sei sicuro di voler cancellare questa risorsa statica?"};
	}
	case DELETE_WR: {
		return {titleModal:"Cancellazione risorsa aggiuntiva per processo", contentText:"Sei sicuro di voler cancellare questa risorsa aggiuntiva di processo?"};
	}
	case DOWNLOAD: {
		return {titleModal:"Scarica risorsa di processo", contentText:"Sei sicuro di voler scaricare questa risorsa?"};
	}
	case DOWNLOAD_RES: {
		return {titleModal:"Scarica risorsa statica", contentText:"Sei sicuro di voler scaricare questa risorsa statica?"};
	}
	case DOWNLOAD_WR: {
		return {titleModal:"Scarica risorsa aggiuntiva di processo", contentText:"Sei sicuro di voler scaricare questa risorsa aggiuntiva di processo?"};
	}
	case UPDATE_WR: {
		return {titleModal:"Update risorsa aggiuntiva per processo", contentText:"Carica il file aggiornato:"};
	}
	case UPDATE_RES: {
		return {titleModal:"Update risorsa statica", contentText:"Carica il file aggiornato"};
	}
	default: {
		return {titleModal:"Errore", contentText:"Qualcosa è andato storto"};
	}
	}
	
};