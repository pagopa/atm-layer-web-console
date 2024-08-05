/* eslint-disable prefer-const */
/* eslint-disable functional/no-let */
/* eslint-disable functional/immutable-data */
import { Link } from "@mui/material";
import { generatePath } from "react-router-dom";
import { ALERT_ERROR, ALERT_SUCCESS, BANKS, CREATE_BANK, CREATE_USER, DELETE_ASSOCIATION, DELETE_BANK, DELETE_BPMN, DELETE_RES, DELETE_USER, DELETE_WR, DEPLOY_BPMN, DEPLOY_WR, DOWNLOAD_BPMN, DOWNLOAD_RES, DOWNLOAD_WR, PROCESS_RESOURCES, PROFILE_IDS, RESOURCES, RESOURCE_BASE_STORAGEKEY, ROLLBACK_WR, TRANSACTIONS, UPDATE_BANK, UPDATE_FIRST_USER, UPDATE_RES, UPDATE_USER, UPDATE_WR, WORKFLOW_RESOURCE } from "../../commons/constants";
import ROUTES from "../../routes";
import { LinkModelDto, PageDto } from "../../model/LinkModel";
import { Profile, User } from "../../model/UserModel";


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

export const getQueryString = (filterValues: any, driver: string, URL?: string): string => {
	let queryString = "";

	if (URL && URL !== "") {
		queryString = queryString.concat(URL);
	}

	const appendQueryParam = (key: string, value: any) => {
		if (value !== undefined && value !== null && value !== "") {
			// Usa encodeURIComponent per codificare il valore
			queryString = queryString.concat(`&${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
		}
	};

	switch (driver) {
	case PROCESS_RESOURCES:
		appendQueryParam("functionType", filterValues?.functionType?.toUpperCase());
		appendQueryParam("fileName", filterValues?.fileName);
		appendQueryParam("modelVersion", filterValues?.modelVersion);
		appendQueryParam("acquirerId", filterValues?.acquirerId);
		appendQueryParam("status", filterValues?.status);
		break;
	case RESOURCES:
		appendQueryParam("fileName", filterValues?.fileName);
		appendQueryParam("noDeployableResourceType", filterValues?.noDeployableResourceType);
		if(filterValues?.storageKey){
			appendQueryParam("storageKey", RESOURCE_BASE_STORAGEKEY + filterValues?.storageKey);
		}
		break;
	case WORKFLOW_RESOURCE:
		appendQueryParam("resourceType", filterValues?.resourceType);
		appendQueryParam("fileName", filterValues?.fileName);
		appendQueryParam("status", filterValues?.status);
		break;
	case DELETE_ASSOCIATION:
		appendQueryParam("branchId", filterValues?.branchId);
		appendQueryParam("terminalId", filterValues?.terminalId);
		break;
	case BANKS:
		appendQueryParam("acquirerId", filterValues?.acquirerId);
		appendQueryParam("denomination", filterValues?.denomination);
		appendQueryParam("clientId", filterValues?.clientId);
		appendQueryParam("rateMin", filterValues?.rateMin);
		appendQueryParam("rateMax", filterValues?.rateMax);
		break;
	case TRANSACTIONS:
		appendQueryParam("transactionId", filterValues?.transactionId);
		appendQueryParam("transactionStatus", filterValues?.transactionStatus);
		appendQueryParam("functionType", filterValues?.functionType);
		appendQueryParam("acquirerId", filterValues?.acquirerId);
		appendQueryParam("branchId", filterValues?.branchId);
		appendQueryParam("terminalId", filterValues?.terminalId);
		break;
	default:
		return "";
	}
	return queryString;
};

export const handleSnackbar = (
	severity: string,
	setMessage: React.Dispatch<React.SetStateAction<any>>,
	setSeverity: React.Dispatch<React.SetStateAction<any>>,
	setTitle: React.Dispatch<React.SetStateAction<any>>,
	setOpenSnackBar: React.Dispatch<React.SetStateAction<any>>,
	valueMessage?: string
) => {
	setSeverity(severity);
	setMessage(severity===ALERT_SUCCESS ? "" : valueMessage ? valueMessage : "Operazione fallita");
	setTitle(severity===ALERT_SUCCESS? "Successo":severity===ALERT_ERROR?"Errore":"Info");
	setOpenSnackBar(true);
};

export const breadCrumbLinkComponent = (arrLinks: Array<LinkModelDto>, message: string) => [
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
	if(currentPage?.isTrnsc){
		links.push({
			rootValue: ROUTES.TRANSACTIONS,
			rootName: "Transazioni"
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
		return {titleModal:"Registrazione istituto bancario", contentText:"Aggiungi un nuovo istituto bancario aderente. Per le chiamate eseguite dai terminali di questa banca puoi limitare: il numero totale di chiamate (quota), il numero di chiamate simultanee (burst) e il numero di chiamate al secondo (tasso)"};
	}
	case UPDATE_BANK: {
		return {titleModal:"Update istituto bancario", contentText:"Sei sicuro di voler modificare i dati di questo istituto bancario?"};
	}
	case DELETE_BANK: {
		return {titleModal:"Cancellazione istituto bancario", contentText:"Sei sicuro di voler cancellare questo istituto bancario dal registro degli aderenti?"};
	}
	case CREATE_USER: {
		return {titleModal:"Creazione nuovo utente", contentText:"Indica email e permessi del nuovo utente"};
	}
	case DELETE_USER: {
		return {titleModal:"Cancellazione utente", contentText:"Sei sicuro di voler cancellare questo utente?"};
	}
	case UPDATE_USER: {
		return {titleModal:"Update utente", contentText:"Modifica le autorizzazioni di questo utente"};
	}
	case UPDATE_FIRST_USER: {
		return {titleModal:"Update primo utente", contentText:"Sei il primo utente che accede alla console: completa il tuo profilo con le informazioni anagrafiche ed eventuali ruoli aggiuntivi"};
	}
	default: {
		return {titleModal:"Errore", contentText:"Qualcosa è andato storto"};
	}
	}
	
};


export function removeArrayItem(index:number, arr?:Array<any>) {
	if (arr){
		// eslint-disable-next-line functional/immutable-data
		arr.splice(index,1);
		return arr;
	}
}

export function removeArrayItems(indexes:Array<number|undefined>, arr?:Array<any>){
	if(arr){
		indexes.filter(x => x || x===0);
		indexes.sort((a,b)=> (a || a===0) && (b || b===0) ? b-a : 0);
		indexes.map(index => index || index===0 ? arr.splice(index,1):index);
		return arr;
	}
};

export function getProfilesIds(user: User){
	return user.profiles.map(profile => profile.profileId);
}


export function getProfileIdsArray(user: User){
	return user.profiles.map(profile => profile.profileId);
};

export function getProfileDescriptions (user: User) {
	if(user.profiles) {
		return user.profiles.map(profile => profile.description);
	}
};

export function getProfileDescriptionByProfileArray (profiles: Array<Profile> = []): Array<string> {
	return profiles.map(profile => profile.description);
};

export function getRoleDescriptionsByUser (loggedUserInfo: User):any {
	return loggedUserInfo.profiles.map((e: { description: any }) => e.description);
};

export function getFilteredButtonConfig (buttonConfigs: any):any {
	return buttonConfigs.filter((config: { visibleCondition: () => any }) => config.visibleCondition());
};

export function addDependentProfiles (selectedProfilesDescriptions : Array<string>, profiles: Array<Profile>) {

	function onlyUnique(value:number, index:number, array:Array<number>) {
		return array.indexOf(value) === index;
	}

	const selectedProfileIds = convertStringToProfiles(selectedProfilesDescriptions, profiles);

	// eslint-disable-next-line functional/no-let
	let selectedAndDefaultProfiles = [...selectedProfileIds];
	selectedAndDefaultProfiles.map(profile => {
		const completeProfile = PROFILE_IDS.find((element) => element.id === profile);
		if (completeProfile) {
			return selectedAndDefaultProfiles = [
				...completeProfile.defaultProfiles,
				...selectedAndDefaultProfiles				
			];
		}
		return selectedAndDefaultProfiles;
	});
	return convertProfileToString(selectedAndDefaultProfiles.filter(onlyUnique), profiles);
};

export function getProfileDescriptionFromStorage (userInfo: any): any {
	const userInfoObject = JSON.parse(userInfo);
	return getProfileIdsArray(userInfoObject);
};

export function convertStringToProfiles(profileDescriptions: Array<string>, profiles: Array<Profile>): Array<number> {
	return profileDescriptions
		.map(description => profiles.find(profile => profile.description === description)?.profileId)
		.filter((id): id is number => id !== undefined);  // Filter out undefined values
};

export function convertProfileToString(profileIds: Array<number>, profiles: Array<Profile>): Array<string> {
	return profileIds
		.map(profileId => profiles.find(profile => profile.profileId === profileId)?.description)
		.filter((description): description is string => description !== undefined);  // Filter out undefined values
};