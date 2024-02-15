import { ASSOCIATE_BPMN, CREATE_BPMN, CREATE_RES, CREATE_WR, DELETE_BPMN, DEPLOY_BPMN, DEPLOY_WR, ROLLBACK_WR, UPDATE_RES, UPDATE_WR, UPGRADE_BPMN } from "../commons/constants";

const formOption:any = () => {
  
	const getFormOptions:any = (driver: string) => {
		switch (driver) {

		case CREATE_BPMN:
			return [
				{ title: "Creazione risorsa di processo", description: " Compilare tutti i campi per creare una nuova risorsa" }
			];

	    case DEPLOY_BPMN:
			return [
				{ title: "Rilascio risorsa di processo", description: "Compilare tutti i campi per rilasciare un processo" }
			];

		case DELETE_BPMN:
			return [
				{ title: "Eliminazione risorsa di processo", description: "Compilare tutti i campi per eliminare un processo" }
			];

		case UPGRADE_BPMN:
			return [
				{ title: "Aggiornamento risorsa di processo", description: "Compilare tutti i campi per creare una nuova versione di un processo" }
			];

		case ASSOCIATE_BPMN:
			return [
				{ title: "Associa risorsa di processo", description: "Compilare tutti i campi per associare un processo ad una banca" }
			];

		case CREATE_RES:
			return [
				{ title: "Creazione risorsa statica", description: "Compilare tutti i campi per creare una nuova risorsa statica" }
			];

		case UPDATE_RES:
			return [
				{ title: "Modifica risorsa statica", description: "Compilare tutti i campi per modificare una risorsa statica"}
			];

		case CREATE_WR:
			return [
				{ title: "Creazione risorsa aggiuntiva", description: "Compilare tutti i campi per creare una nuova risorsa per processi" }
			];

		case DEPLOY_WR:
			return [
				{ title: "Rilascio risorsa aggiuntiva", description: "Inserire ID per rilasciare una risorsa per processi" }
			];

		case ROLLBACK_WR:
			return [
				{ title: "Ripristino risorsa aggiuntiva", description: "Inserire ID per ripristinare l'ultima versione rilasciata" }
			];

		case UPDATE_WR:
			return [
				{ title: "Modifica risorsa aggiuntiva", description: "Compilare tutti i campi per aggiornare una risorsa" }
			];
		default:
			return [];
		}
	};
	return { getFormOptions };
};
export default formOption;
