export const CREATE_BPMN= "createBpmn";
export const DEPLOY_BPMN= "deployBpmn";
export const UPGRADE_BPMN= "upgradeBpmn";
export const DELETE_BPMN= "deleteBpmn";
export const ASSOCIATE_BPMN= "associateBpmn";
export const DOWNLOAD_BPMN = "downloadBpmn";
export const DELETE_ASSOCIATION = "deleteAssociation";



export const CREATE_RES= "createResources";
export const UPDATE_RES= "updateResources";
export const DELETE_RES="deleteResources";
export const DOWNLOAD_RES="downloadResources";

export const CREATE_WR= "createWR";
export const DEPLOY_WR= "deployWR";
export const ROLLBACK_WR= "rollbackWR";
export const UPDATE_WR= "updateWR";
export const DELETE_WR= "deleteWR";
export const DOWNLOAD_WR= "downloadWR";

export const CREATE_USER = "createUser";
export const UPDATE_USER = "updateUser";
export const DELETE_USER = "deleteUser";
export const UPDATE_FIRST_USER = "updateFirstUser";

export const BPMN="BPMN";
export const DMN = "DMN";
export const FORM = "FORM";

export const PROCESS_RESOURCES="processResources";
export const WORKFLOW_RESOURCE="workFlowResource";
export const RESOURCES="staticResources";
export const BPMN_ASSOCIATED = "bpmnAssociated";
export const USERS = "users";

export const DEPLOY_VALUES = [DEPLOY_BPMN, DEPLOY_WR];
export const MAX_LENGTH_NUMERIC = 6;
export const MAX_LENGTH_SMALL = 10;
export const MAX_LENGTH_MEDIUM = 25;
export const MAX_LENGHT_LARGE = 50 ;
export const ACQUIRER_ID_LENGTH = 11;
export const TERMINAL_BRANCH_LENGTH = 8;
export const RESOURCE_BASE_STORAGEKEY = "RESOURCE/files/";

export const BANKS="banks";
export const CREATE_BANK="createBank";
export const DELETE_BANK="deleteBank";
export const UPDATE_BANK="updateBank";
export const ALERT_SUCCESS = "success";
export const ALERT_ERROR = "error";
export const ALERT_INFO = "info";

export const LETTURA = 1;
export const SCRITTURA = 2;
export const RILASCIO = 3;
export const EMULATOR = 4;
export const UTENTI = 5;

export const PROFILE_IDS = [
	{
		id: LETTURA,
		defaultProfiles: []
	},
	{
		id: SCRITTURA,
		defaultProfiles: [LETTURA]
	},
	{
		id: RILASCIO,
		defaultProfiles: [LETTURA,SCRITTURA]
	},
	{
		id: EMULATOR,
		defaultProfiles: []
	},
	{
		id: UTENTI,
		defaultProfiles: []
	}
];
