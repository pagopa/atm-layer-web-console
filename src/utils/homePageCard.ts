import routes from "../routes";

export const homePageCard = [
	{
		title: "Home",
		id: "home",
		description:"Home Page",
		icon:"HomeOutlined",
		pageLink: routes.HOME
	},
	{
		title: "Risorse di processo",
		id: "process",
		description:"I processi sono file BPMN che, una volta deployati, costituiranno gli step del flusso da seguire sul terminale ATM.",
		icon:"AccountTree",
		pageLink: routes.BPMN
	},
	{
		title: "Risorse statiche",
		id: "static",
		description:"Le risorse statiche sono file HTML, immagini che possono essere visualizzati nel terminale ATM per la costruzione della pagina.",
		icon:"Description",
		pageLink: routes.RESOURCES
	},
	{
		title: "Risorse aggiuntive per processi",
		id: "workflow",
		description:"File BPMN, DMN o FORM possono essere deployati e inclusi in più di un processo contemporaneamente, a supporto del porcesso stesso.",
		icon:"Widgets",
		pageLink: routes.WORKFLOW_RESOURCES
	},
	{
		title: "Banche",
		id: "banks",
		description:"Gestione Banche aderenti e relativi piani di utilizzo.",
		icon:"AccountBalanceIcon",
		pageLink: routes.BANK
	},
	{
		title: "Transazioni",
		id: "transactions",
		description:"Elenco aggiornato delle transazioni eseguite (o tutt'ora in corso) negli ultimi tre mesi.",
		icon:"AssignmentOutlined",
		pageLink: routes.TRANSACTIONS
	},
	{
		title: "Utenti e autorizzazioni",
		id: "users",
		description:"Gestione utenti e permessi",
		icon:"PersonOutline",
		pageLink: routes.USERS
	}
];