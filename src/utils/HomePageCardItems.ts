import routes from "../routes";

export const homePageCardItems = [
	{
		title: "Home",
		id: "home",
		description:"Home Page",
		icon:"HomeOutlined",
		pageLink: routes.HOME
	},
	{
		title: "Processi",
		id: "process",
		description:"I processi sono file BPMN che, una volta deployati, istruiscono gli step seguiti dal terminale ATM.",
		icon:"AccountTree",
		pageLink: routes.BPMN
	},
	{
		title: "Risorse statiche",
		id: "static",
		description:"Le risorse statiche sono file che possono essere visualizzati nel terminale ATM (HTML, immagini,...)  o più in generale file che possono essere [completare]",
		icon:"Description",
		pageLink: "/"
	},
	{
		title: "Risorse per processi",
		id: "workflow",
		description:"File BPMN, DMN o FORM possono essere deployati e inclusi in più di un processo contemporaneamente, a supporto del porcesso stesso.",
		icon:"Widgets",
		pageLink: "/"
	}
];