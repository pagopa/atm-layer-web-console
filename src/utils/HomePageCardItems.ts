import routes from "../routes";

export const homePageCardItems = [
	{
		title: "Processi",
		description:"accedi alla sezione dedicata ai processi BPMN",
		icon:"AccountTree",
		pageLink: routes.UPLOAD
	},
	{
		title: "Risorse statiche",
		description:"accedi alla sezione dedicata alle risorse statiche (file html, immagini, ...)",
		icon:"Description",
		pageLink: routes.UPLOAD
	},
	{
		title: "Risorse per processi",
		description:"accedi alla sezione dedicata ai file di supporto dei processi (BPMN, DMN, FORM)",
		icon:"Widgets",
		pageLink: routes.UPLOAD
	}
];