
const ROUTES = {
	HOME: "/",
	WARNING_CODE: "/warning-code",
	ERROR_PAGE: "/error",
	UNAUTHORIZED_PAGE: "/unauthorized",
	BPMN: "/bpmn",
	RESOURCES: "/resources",
	WORKFLOW_RESOURCES: "/workflow_resources",
	BPMN_DETAILS: "/bpmnId/:bpmnId/modelVersion/:modelVersion",
	WORKFLOW_RESOURCE_DETAILS: "/workflowResourceId/:workflowResourceId",
	RESOURCES_DETAILS: "/resourceId/:resourceId",
	BANK_DETAILS: "/bankId/:acquirerId",
	CREATE_BPMN: "/bpmn/create",
	ASSOCIATE_BPMN: "/bpmn/associate",
	CREATE_RESOURCE: "/resources/create",
	UPGRADE_BPMN: "/bpmn/upgrade",
	CREATE_WR: "/workflow_resources/create",
	LOGIN: "/login",
	LOGIN_BACK:"/login/callback",
	TRANSACTIONS: "/transactions",
	BANK:"/bank",
	USERS: "/users",
};

export default ROUTES;
