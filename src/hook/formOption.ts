const formOption:any = () => {
  
	const getFormOptions:any = (driver: string) => {
		switch (driver) {
		case "Create":
			return [
				{title:"Creazione BPMN", description: " Compila tutti i campi per creare un nuovo BPMN"}
			];

	    case "Deploy":
			return [
				{title:"Rilascio BPMN", description: "Compila tutti i campi per rilasciare un BPMN"}
			];

		case "Resources":
			return [
				// {
				// 	label: "Resources GetAll",
				// 	onClick: () => console.log("Resources GetAll clicked!")
				// },
				// {
				// 	label: "Resources Create",
				// 	onClick: () => console.log("Resources Create clicked!")
				// },
				// {
				// 	label: "Resources Update",
				// 	onClick: () => console.log("Resources Upgrade clicked!")
				// },
			];
		case "WorkFlow Resource":
			return [
				// {
				// 	label: "WorkFlow Resource GetAll",
				// 	onClick: () => console.log("WorkFlow Resource GetAll clicked!")
				// },
				// {
				// 	label: "WorkFlow Resource Create",
				// 	onClick: () => console.log("WorkFlow Resource Create clicked!")
				// },
				// {
				// 	label: "WorkFlow Resource Update",
				// 	onClick: () => console.log("WorkFlow Resource Update clicked!")
				// },
				// {
				// 	label: "WorkFlow Resource Deploy",
				// 	onClick: () => console.log("WorkFlow Resource Deploy clicked!")
				// },
				// {
				// 	label: "WorkFlow Resource Delete",
				// 	onClick: () => console.log("WorkFlow Resource Delete clicked!")
				// },
				// {
				// 	label: "WorkFlow Resource RollBack",
				// 	onClick: () => console.log("WorkFlow Resource Rollback clicked!")
				// },
			];
		default:
			return [];
		}
	};
	return { getFormOptions };
};
export default formOption;
