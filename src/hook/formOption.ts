const formOption:any = () => {
  
	const getFormOptions:any = (driver: string) => {
		switch (driver) {

		case "Create BPMN":
			return [
				{title:"Creazione BPMN", description: " Compila tutti i campi per creare un nuovo BPMN"}
			];

	    case "Deploy BPMN":
			return [
				{title:"Rilascio BPMN", description: "Compila tutti i campi per rilasciare un BPMN"}
			];

		case "Delete BPMN":
			return [
				{title:"Eliminazione BPMN", description: "Compila tutti i campi per Eliminare un BPMN"}
			];

		case "Upgrade BPMN":
			return [
				{title:"Aggiornamento BPMN", description: "Compila tutti i campi per modificare un BPMN"}
			];

		case "Associate BPMN":
			return [
				{title:"Associa BPMN", description: "Compila tutti i campi per Associare un BPMN"}
			];

		case "Create Resources":
			return [
				{title:"Creazione Resources", description: " Compila tutti i campi per creare un nuovo Resource"}
			];

		case "Update Resources":
			return [
				{title:"Aggiornamento Resources", description: " Compila tutti i campi per aggiornare una risorsa esistente"}
			];

		case "Create WR":
			return [
				{title:"Creazione Workflow Resource", description: " Compila tutti i campi per creare una nuova Workflow Resource"}
			];

		case "Deploy WR":
			return [
				{title:"Rilascio Workflow Resource", description: " Compila il campo di identificativo unico per rilasciare una risorsa esistente"}
			];

		case "Rollback WR":
			return [
				{title:"Rollback Workflow Resource", description: " Compila il campo di identificativo unico per ripristinare l&apos;ultima versione rilasciata"}
			];

		case "Update WR":
			return [
				{title:"Aggiornamento Workflow Resource", description: " Compila tutti i campi per aggiornare una risorsa esistente"}
			];
				
		// case "Resources":
		// 	return [
		// 		{
		// 			label: "Resources GetAll",
		// 			onClick: () => console.log("Resources GetAll clicked!")
		// 		},
		// 		{
		// 			label: "Resources Create",
		// 			onClick: () => console.log("Resources Create clicked!")
		// 		},
		// 		{
		// 			label: "Resources Update",
		// 			onClick: () => console.log("Resources Upgrade clicked!")
		// 		},
		// 	];
		// case "WorkFlow Resource":
		// 	return [
		// 		{
		// 			label: "WorkFlow Resource GetAll",
		// 			onClick: () => console.log("WorkFlow Resource GetAll clicked!")
		// 		},
		// 		{
		// 			label: "WorkFlow Resource Create",
		// 			onClick: () => console.log("WorkFlow Resource Create clicked!")
		// 		},
		// 		{
		// 			label: "WorkFlow Resource Update",
		// 			onClick: () => console.log("WorkFlow Resource Update clicked!")
		// 		},
		// 		{
		// 			label: "WorkFlow Resource Deploy",
		// 			onClick: () => console.log("WorkFlow Resource Deploy clicked!")
		// 		},
		// 		{
		// 			label: "WorkFlow Resource Delete",
		// 			onClick: () => console.log("WorkFlow Resource Delete clicked!")
		// 		},
		// 		{
		// 			label: "WorkFlow Resource RollBack",
		// 			onClick: () => console.log("WorkFlow Resource Rollback clicked!")
		// 		},
		// 	];
		default:
			return [];
		}
	};
	return { getFormOptions };
};
export default formOption;
