import routes from "../routes";

export const homePageCardItems=[
	{
		title: "Processi",
		description:"accedi alla sezione dedicata ai processi BPMN",
		icon:"AccountTreeIcon",
		pageLink: routes.UPLOAD
	},
	{
		title: "Risorse statiche",
		description:"accedi alla sezione dedicata alle risorse statiche (file html, immagini, ...)",
		icon:"DescriptionIcon",
		pageLink: routes.UPLOAD
	},
	{
		title: "Risorse per processi",
		description:"accedi alla sezione dedicata ai file di supporto si processi (BPMN, DMN, FORM)",
		icon:"WidgetsIcon",
		pageLink: routes.UPLOAD
	}
];