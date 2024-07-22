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
export const MAX_LENGHT_LARGE = 50 ;
export const ACQUIRER_ID_LENGTH = 11;
export const TERMINAL_BRANCH_LENGTH = 8;

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

export const RESOURCE_BASE_STORAGEKEY = "RESOURCE/files/";

export const mockedProfiles = [
	{
	  "description": "Gestione flussi in lettura",
	  "profileId": 1,
	  "createdAt": "2024-05-27",
	  "lastUpdatedAt": "2024-05-27"
	},
	{
	  "description": "Gestione flussi in scrittura",
	  "profileId": 2,
	  "createdAt": "2024-05-27",
	  "lastUpdatedAt": "2024-05-27"
	},
	{
	  "description": "Rilascio BPMN",
	  "profileId": 3,
	  "createdAt": "2024-05-27",
	  "lastUpdatedAt": "2024-05-27"
	},
	{
	  "description": "Emulator",
	  "profileId": 4,
	  "createdAt": "2024-05-27",
	  "lastUpdatedAt": "2024-05-27"
	},
	{
	  "description": "Gestione utenti",
	  "profileId": 5,
	  "createdAt": "2024-05-27",
	  "lastUpdatedAt": "2024-05-27"
	}
];
