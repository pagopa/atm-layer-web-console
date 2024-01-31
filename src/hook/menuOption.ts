import { BPMN, RESOURCES, WORKFLOW_RESOURCE } from "../commons/constants";

const menuOption:any = () => {
  
	const getMenuOptions:any = (driver: string) => {
		switch (driver) {
		case BPMN:
			return [
				{label: "BPMN GetAll", onClick: () => console.log("BPMN GetAll clicked!")},
				{label: "BPMN Create", onClick: () => console.log("BPMN Create clicked!")},
				{label: "BPMN Upgrade",
					onClick: () => console.log("BPMN Upgrade clicked!")
				},
				{
					label: "BPMN Deploy",
					onClick: () => console.log("BPMN Upgrade clicked!")
				},
				{
					label: "BPMN Delete",
					onClick: () => console.log("BPMN Delate clicked!")
				},
				{
					label: "BPMN Associate",
					onClick: () => console.log("BPMN Upgrade clicked!")
				},
				{
					label: "BPMN Download",
					onClick: () => console.log("BPMN create clicked!")
				}
			];

		case RESOURCES:
			return [
				{
					label: "Resources GetAll",
					onClick: () => console.log("Resources GetAll clicked!")
				},
				{
					label: "Resources Create",
					onClick: () => console.log("Resources Create clicked!")
				},
				{
					label: "Resources Update",
					onClick: () => console.log("Resources Upgrade clicked!")
				},
			];
		case WORKFLOW_RESOURCE:
			return [
				{
					label: "WorkFlow Resource GetAll",
					onClick: () => console.log("WorkFlow Resource GetAll clicked!")
				},
				{
					label: "WorkFlow Resource Create",
					onClick: () => console.log("WorkFlow Resource Create clicked!")
				},
				{
					label: "WorkFlow Resource Update",
					onClick: () => console.log("WorkFlow Resource Update clicked!")
				},
				{
					label: "WorkFlow Resource Deploy",
					onClick: () => console.log("WorkFlow Resource Deploy clicked!")
				},
				{
					label: "WorkFlow Resource Delete",
					onClick: () => console.log("WorkFlow Resource Delete clicked!")
				},
				{
					label: "WorkFlow Resource RollBack",
					onClick: () => console.log("WorkFlow Resource Rollback clicked!")
				},
			];
		default:
			return [];
		}
	};
	return { getMenuOptions };
};
export default menuOption;
