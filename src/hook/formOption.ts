import { ASSOCIATE_BPMN, CREATE_BPMN, CREATE_RES, CREATE_WR, DELETE_BPMN, DEPLOY_BPMN, DEPLOY_WR, ROLLBACK_WR, UPDATE_RES, UPDATE_WR, UPGRADE_BPMN } from "../commons/constants";

const formOption:any = () => {
  
	const getFormOptions:any = (driver: string) => {
		switch (driver) {

		case CREATE_BPMN:
			return [
				{ title: "Creazione BPMN", description: " Compila tutti i campi per creare un nuovo BPMN" }
			];

	    case DEPLOY_BPMN:
			return [
				{ title: "Rilascio BPMN", description: "Compila tutti i campi per rilasciare un BPMN" }
			];

		case DELETE_BPMN:
			return [
				{ title: "Eliminazione BPMN", description: "Compila tutti i campi per Eliminare un BPMN" }
			];

		case UPGRADE_BPMN:
			return [
				{ title: "Aggiornamento BPMN", description: "Compila tutti i campi per modificare un BPMN" }
			];

		case ASSOCIATE_BPMN:
			return [
				{ title: "Associa BPMN", description: "Compila tutti i campi per Associare un BPMN" }
			];

		case CREATE_RES:
			return [
				{ title: "Creazione Resources", description: " Compila tutti i campi per creare un nuovo Resource" }
			];

		case UPDATE_RES:
			return [
				{ title: "Aggiornamento Resources", description: " Compila tutti i campi per aggiornare una risorsa esistente" }
			];

		case CREATE_WR:
			return [
				{ title: "Creazione Workflow Resource", description: " Compila tutti i campi per creare una nuova Workflow Resource" }
			];

		case DEPLOY_WR:
			return [
				{ title: "Rilascio Workflow Resource", description: " Compila il campo di identificativo unico per rilasciare una risorsa esistente" }
			];

		case ROLLBACK_WR:
			return [
				{ title: "Rollback Workflow Resource", description: " Compila il campo di identificativo unico per ripristinare l&apos;ultima versione rilasciata" }
			];

		case UPDATE_WR:
			return [
				{ title: "Aggiornamento Workflow Resource", description: " Compila tutti i campi per aggiornare una risorsa esistente" }
			];
		case "GetAll":
			return [
				{ title: "BPMN disponibili", description: "Lista BPMN" }
			];
		default:
			return [];
		}
	};
	return { getFormOptions };
};
export default formOption;
