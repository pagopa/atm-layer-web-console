/* eslint-disable prefer-const */
/* eslint-disable functional/no-let */
/* eslint-disable functional/immutable-data */
import { Link } from "@mui/material";
import { generatePath } from "react-router-dom";
import { BANKS, CREATE_BANK, DELETE_ASSOCIATION, DELETE_BANK, DELETE_BPMN, DELETE_RES, DELETE_WR, DEPLOY_BPMN, DEPLOY_WR, DOWNLOAD_BPMN, DOWNLOAD_RES, DOWNLOAD_WR, PROCESS_RESOURCES, RESOURCES, ROLLBACK_WR, UPDATE_BANK, UPDATE_RES, UPDATE_WR, WORKFLOW_RESOURCE } from "../../commons/constants";
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

type DriverType = 
  | typeof PROCESS_RESOURCES
  | typeof RESOURCES
  | typeof WORKFLOW_RESOURCE
  | typeof DELETE_ASSOCIATION
  | typeof BANKS;

export const getQueryString = (filterValues: any, driver: string, URL?: string) => {
	let queryString = URL ? URL : "";

	const addQueryParam = (param: string, value: any) => {
		if (value) {
			queryString = queryString.concat(`&${param}=${value}`);
		}
	};

	const drivers: Record<DriverType, () => void> = {
		[PROCESS_RESOURCES]: () => {
			addQueryParam("functionType", filterValues?.functionType?.toUpperCase());
			addQueryParam("fileName", filterValues?.fileName);
			addQueryParam("modelVersion", filterValues?.modelVersion);
			addQueryParam("acquirerId", filterValues?.acquirerId);
			addQueryParam("status", filterValues?.status);
		},
		[RESOURCES]: () => {
			addQueryParam("fileName", filterValues?.fileName);
			addQueryParam("noDeployableResourceType", filterValues?.noDeployableResourceType);
			addQueryParam("storageKey", filterValues?.storageKey);
		},
		[WORKFLOW_RESOURCE]: () => {
			addQueryParam("resourceType", filterValues?.resourceType);
			addQueryParam("fileName", filterValues?.fileName);
			addQueryParam("status", filterValues?.status);
		},
		[DELETE_ASSOCIATION]: () => {
			addQueryParam("branchId", filterValues?.branchId);
			addQueryParam("terminalId", filterValues?.terminalId);
		},
		[BANKS]: () => {
			addQueryParam("acquirerId", filterValues?.acquirerId);
			addQueryParam("denomination", filterValues?.denomination);
			addQueryParam("clientId", filterValues?.clientId);
			addQueryParam("rateMin", filterValues?.rateMin);
			addQueryParam("rateMax", filterValues?.rateMax);
		}
	};

	if (drivers[driver as DriverType]) {
		drivers[driver as DriverType]();
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
			key={"link"+e.rootName}
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
	if(currentPage?.isBank){
		links.push({
			rootValue: ROUTES.BANK,
			rootName: "Gestione banche"
		});
	}
	if(currentPage?.isBank && isDetail){
		links.push({
			rootValue: generatePath(ROUTES.BANK_DETAILS, { acquirerId: recordParams?.acquirerId }),
			rootName: "Dettaglio banca"
		});
	}
	return links;
};

export function getTextModal(type:string):any {
	
	switch (type) {
	case ROLLBACK_WR: {
		return {titleModal:"Ripristino risorsa aggiuntiva per processo", contentText:"Sei sicuro di voler ripristinare la versione precedente della risorsa?"};
	}
	case DEPLOY_BPMN: {
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
	case DOWNLOAD_BPMN: {
		return {titleModal:"Scarica risorsa di processo", contentText:"Sei sicuro di voler scaricare questa risorsa?"};
	}
	case DOWNLOAD_RES: {
		return {titleModal:"Scarica risorsa statica", contentText:"Sei sicuro di voler scaricare questa risorsa statica?"};
	}
	case DOWNLOAD_WR: {
		return {titleModal:"Scarica risorsa aggiuntiva di processo", contentText:"Sei sicuro di voler scaricare questa risorsa aggiuntiva di processo?"};
	}
	case UPDATE_WR: {
		return {titleModal:"Update risorsa aggiuntiva per processo", contentText:"Carica il file aggiornato*:"};
	}
	case UPDATE_RES: {
		return {titleModal:"Update risorsa statica", contentText:"Carica il file aggiornato"};
	}
	case CREATE_BANK: {
		return {titleModal:"Registrazione istituto bancario", contentText:"Aggiungi un nuovo istituto bancario aderente, inserendo il suo ID e limite di chiamate mensili (?); usa il campo Nome Banca per salvare un alias/nome comune"};
	}
	case UPDATE_BANK: {
		return {titleModal:"Update istituto bancario", contentText:"Sei sicuro di voler modificare i dati di questo istituto bancario?"};
	}
	case DELETE_BANK: {
		return {titleModal:"Cancellazione istituto bancario", contentText:"Sei sicuro di voler cancellare questo istituto bancario dal registro degli aderenti?"};
	}
	default: {
		return {titleModal:"Errore", contentText:"Qualcosa è andato storto"};
	}
	}
	
};