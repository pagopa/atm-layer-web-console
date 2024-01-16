import routes from "../routes";

export const homePageCardItems = [
	{
		title: "Processi",
		description:"I processi sono file BPMN che, una volta deployati, istruiscono gli step seguiti dal terminale ATM.",
		icon:"AccountTree",
		pageLink: routes.UPLOAD
	},
	{
		title: "Risorse statiche",
		description:"Le risorse statiche sono file che possono essere visualizzati nel terminale ATM (HTML, immagini,...)  o più in generale file che possono essere [completare]",
		icon:"Description",
		pageLink: routes.UPLOAD
	},
	{
		title: "Risorse per processi",
		description:"File BPMN, DMN o FORM possono essere deployati e inclusi in più di un processo contemporaneamente, a supporto del porcesso stesso.",
		icon:"Widgets",
		pageLink: routes.UPLOAD
	}
];